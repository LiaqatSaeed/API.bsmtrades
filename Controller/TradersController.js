var express = require('express');
var router = express.Router();
import first from 'lodash/first';
import { authenticate, authError, DBConnection, mongoose, removeEmpty } from '../middleware';
import Traders from '../Model/Traders';
import map from "lodash/map";


router.use(authenticate, DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
    const {
        params: { id },
    } = req;
    Traders.findById(mongoose.Types.ObjectId(id), (err, trader) => {
        if (err) res.status(500).send(err);
        else {
            req.trader = trader;
            next();
        }
    });
});

var routes = () => {
    router.post('/', async (req, res) => {
        try {
            const { trader } = req.body;

            var trader_Obj = new Traders(trader);
            trader_Obj.save(async (err, result) => {
                if (err) res.status(500).send(err);

                res.json({ data: result });
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //: GET ALL
    router.get('/', async (req, res) => {
        try {
            const { query } = req;

            Traders.find(query, function (err, traders) {
                res.send({ data: traders });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    });

    router.get('/ddl', async (req, res) => {
        try {
            Traders.find({}, function (err, traders) {
                traders = map(traders, (item) => {
                    return {
                        value: item.email,
                        label: `${item.first_name} ${item.last_name}`,
                    };
                });
                res.send({ data: traders });
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router
        .route('/id/:id')
        //: GET
        .get((req, res) => {
            res.json({ data: req.trader });
        })
        //: GET PUT

        .put(async (req, res, next) => {
            const { trader } = req.body;
            const { id } = req.params;
            Traders.updateOne(
                { _id: id },
                trader,
                async function (result, err) {
                    Traders.aggregate([
                        {
                            $match: {
                                _id: mongoose.Types.ObjectId(id),
                            },
                        },

                    ])
                        .then(async (updated) => {
                            updated = first(updated);

                            res.json({
                                data: updated,
                                meta: { message: 'Updated Successfully' },
                            });
                        })
                        .catch((error) =>
                            res.status(500).send({ error: error, msg: 'trader Update 1' })
                        );
                }
            ).catch((error) => {
                res.status(500).send({ error: error, msg: 'trader Update 1' });
            });
        })
        //: PATCH

        .patch((req, res) => {
            Traders.update({ _id: req.params.id }, req.body)
                .then((result) => {
                    res.json({ data: result });
                })
                .catch((err) => {
                    res.status(500).send(error);
                });
        })
        //: DELETE

        .delete(async (req, res) => {
            try {
                Traders.findByIdAndRemove(req.params.id, (err, todo) => {
                    if (err) return res.status(500).send(err);
                    const response = {
                        message: 'Todo successfully deleted',
                        id: todo._id,
                    };
                    return res.status(200).json({
                        meta: { message: 'Records has been delete successfully!' },
                    });
                });
            } catch (error) { }
        });

    return router;
};

module.exports = routes;
