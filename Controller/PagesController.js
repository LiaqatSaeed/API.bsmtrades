var express = require('express');
var router = express.Router();
import first from 'lodash/first';
import {
  authenticate,
  authError,
  DBConnection,
  mongoose,
  removeEmpty,
} from '../middleware';
import Pages from '../Model/Pages';
import map from 'lodash/map';

router.use(authenticate, DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;
  Pages.findById(mongoose.Types.ObjectId(id), (err, pages) => {
    if (err) res.status(500).send(err);
    else {
      req.pages = pages;
      next();
    }
  });
});

var routes = () => {
  router.post('/', async (req, res) => {
    try {
      const { page } = req.body;

      var page_Obj = new Pages(page);
      page_Obj.save(async (err, result) => {
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
      let { query } = req;

      query = {
        ...query,
        parent_id:8
      }


      Pages.find(query, function (err, pages) {
        res.send({ data: pages });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  router
    .route('/id/:id')
    //: GET
    .get((req, res) => {
      res.json({ data: req.pages });
    })
    //: GET PUT

    .put(async (req, res, next) => {
      const { page } = req.body;
      const { id } = req.params;
      Pages.updateOne({ _id: id }, page, async function (result, err) {
        Pages.aggregate([
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
            res.status(500).send({ error: error, msg: 'pages Update 1' })
          );
      }).catch((error) => {
        res.status(500).send({ error: error, msg: 'pages Update 1' });
      });
    })
    //: PATCH

    .patch((req, res) => {
      Pages.update({ _id: req.params.id }, req.body)
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
        Pages.findByIdAndRemove(req.params.id, (err, todo) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: 'Todo successfully deleted',
            id: todo._id,
          };
          return res.status(200).json({
            meta: { message: 'Records has been delete successfully!' },
          });
        });
      } catch (error) {}
    });

  return router;
};

module.exports = routes;
