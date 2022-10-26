var express = require('express');
var router = express.Router();
import first from 'lodash/first';
import includes from 'lodash/includes';
import join from "lodash/join";
import lowerCase from 'lodash/lowerCase';
import map from 'lodash/map';
import nth from 'lodash/nth';
import replace from 'lodash/replace';
import size from 'lodash/size';
import split from 'lodash/split';
import { closeTradeTemplate } from "../Business/EmailTemplates/closeTrade";
import { sendPostTrade } from '../Business/settingsBLL';
import { authError, DBConnection, mongoose, removeEmpty } from '../middleware';
import PostTrade from '../Model/PostTrades';
const { ObjectId } = mongoose.Types;


router.use(DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
    const {
        params: { id },
    } = req;
    PostTrade.findById(mongoose.Types.ObjectId(id), (err, post_trade) => {
        if (err) res.status(500).send(err);
        else {
            res.json({ data: post_trade });
        }
    });
});

var routes = () => {
    router.post('/', async (req, res) => {
        try {
            const { message, subject } = req.body;

            const trading_type = lowerCase(nth(split(subject, ' '), 2));

            const parsedObject = {
                trading_type,
            };

            map(split(message, '\n'), (item) => {
                item = replace(item, ':', '/');
                let ObjectKeyPair = split(item, '/');
                let keyType = replace(lowerCase(ObjectKeyPair[0]), ' ', '_');

                if (keyType === 'close_time' || keyType === 'open_time') {

                    ObjectKeyPair[1] = join(split(ObjectKeyPair[1], "."), "/");
                }



                return (parsedObject[keyType] = ObjectKeyPair[1]);
            });

            let results = await PostTrade.find({
                ticket_id: parsedObject.ticket_id,
            });

            if (trading_type === 'opened') {
                if (size(results) === 0) {


                    if (includes(["Sell_Limit", "Buy_Limit", "Sell_Stop", "Buy_Stop"], parsedObject.trade_type)) {
                        parsedObject.trading_type = "wordOrder";
                    }

                    var trade_queue_obj = new PostTrade({ ...parsedObject });
                    trade_queue_obj.save((err, result) => {
                        if (err) res.status(500).send(err);

                        res.json({ data: result });
                    });
                }
                else {
                    res.json({ message: "Already Exist" });
                }
            } else {

                if (size(results) > 0) {
                    const prev = first(results);
                    let updatedObj = { ...prev._doc, ...parsedObject, trading_type: "closed" };
                    PostTrade.updateOne({ _id: prev._id }, updatedObj).then(
                        async (updated) => {

                            const html = closeTradeTemplate(updatedObj);
                            await sendPostTrade(updatedObj, html, 'Trade Closure');

                            res.json({ data: updatedObj });
                        }
                    );
                } else {
                    res.json({ message: 'Ticket ID not found' });
                }
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //: GET ALL
    router.get('/', async (req, res) => {
        try {
            const { query } = req;

            PostTrade.find(query, function (err, post_trades) {
                res.send({ data: post_trades });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    });

    return router;
};

module.exports = routes;
