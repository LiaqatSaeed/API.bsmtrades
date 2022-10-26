var express = require('express');
var router = express.Router();
import { sendPostTrade } from '../Business/settingsBLL';
import {
  authenticate,
  authError,
  DBConnection,
  mongoose,
  removeEmpty,
} from '../middleware';
import PostTrade from '../Model/PostTrades';
const { ObjectId } = mongoose.Types;
import { openTradeTemplate } from '../Business/EmailTemplates/openTrade';
import { closeTradeTemplate } from "../Business/EmailTemplates/closeTrade"


router.use(authenticate, DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;
  PostTrade.findById(mongoose.Types.ObjectId(id), (err, post_trade) => {
    if (err) res.status(500).send(err);
    else {
      req.post_trade = post_trade;
      next();
    }
  });
});

var routes = () => {
  router.post('/', async (req, res) => {
    try {
      let { post_trade } = req.body;

      const currentDate = new Date(post_trade.open_time);

      post_trade = {
        ...post_trade,
        trading_type: 'opened',
        open_time: currentDate.toISOString(),
      };

      var post_trade_Obj = new PostTrade(post_trade);
      post_trade_Obj.save(async (err, result) => {
        if (err) res.status(500).send(err);

        const html = openTradeTemplate(post_trade);

        await sendPostTrade(post_trade, html, 'New Trade');

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

      let { from, ...reqQuery } = query;

      reqQuery = { trade_type: { $in: ["Sell", "Buy"] }, ...reqQuery};

      if (from === 'opened') {
        reqQuery = {  user_email: { $ne: '' }, ...reqQuery };
      } else if (from === 'queue') {
        reqQuery = { user_email: '', ...reqQuery };
      }
      else if (from === "wordOrder") {
        reqQuery = { user_email: '', ...reqQuery, trade_type: { $in: ["Sell_Limit", "Buy_Limit", "Sell_Stop", "Buy_Stop"] } };
      }
      else if (from === "cancelled") {
        reqQuery = { user_email: '', ...reqQuery, trade_type: { $in: ["Sell_Limit", "Buy_Limit", "Sell_Stop", "Buy_Stop"] } };
      }
      

      PostTrade.aggregate([
        {
          $match: reqQuery,
        },
        {
          $lookup: {
            from: 'traders',
            localField: 'user_email',
            foreignField: 'email',
            as: 'trader',
          },
        },
        {
          $unwind: {
            path: '$trader',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
        .then((result) => {
          res.send({ data: result });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
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
      res.json({ data: req.post_trade });
    })
    //: GET PUT

    .put(async (req, res, next) => {
      const { post_trade } = req.body;
      let { id } = req.params;
      id = mongoose.Types.ObjectId(id);


      if (post_trade.trading_type === "closed") {
        const date = new Date();
        post_trade.close_time = date.toISOString()
      }

      PostTrade.updateOne(
        { _id: id },
        { ...post_trade },
        async (result, err) => {

          if (post_trade.trading_type === "opened") {
            const html = openTradeTemplate(post_trade);
            await sendPostTrade(post_trade, html, `New Trade`);
          }
          else {
            const html = closeTradeTemplate(post_trade);
            await sendPostTrade(post_trade, html, 'Trade Closure');
          }


          res.json({
            data: post_trade,
            meta: { message: 'Updated Successfully' },
          });
        }
      ).catch((error) => {
        res.status(500).send({ error: error, msg: 'post_trade Update 1' });
      });
    })
    //: PATCH

    .patch((req, res) => {
      PostTrade.update({ _id: req.params.id }, req.body)
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
        PostTrade.findByIdAndRemove(req.params.id, (err, todo) => {
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
