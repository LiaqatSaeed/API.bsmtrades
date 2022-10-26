var express = require('express');
var router = express.Router();
import lowerCase from 'lodash/lowerCase';
import map from 'lodash/map';
import replace from 'lodash/replace';
import split from 'lodash/split';
import trim from 'lodash/trim';
import reduce from 'lodash/reduce';
import { authError, DBConnection, mongoose, removeEmpty } from '../middleware';
import LiveTrade from '../Model/LiveTrades';
import { BulkUpdateLiveTrade } from '../Business';
import join from 'lodash/join';

router.use(DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;
  LiveTrade.findById(mongoose.Types.ObjectId(id), (err, live_trade) => {
    if (err) res.status(500).send(err);
    else {
      req.live_trade = live_trade;
      next();
    }
  });
});

var routes = () => {
  router.post(
    '/',
    async (req, res, next) => {
      try {
        const { message, subject } = req.body;

        req.listLiveTrades = map(split(trim(message), '\n'), (item) => {
          let ObjectValue = item.split(',');
          let liveTradeObj = {};

          liveTradeObj = map(ObjectValue, (keyValue) => {
            keyValue = replace(keyValue, ':', '/');
            let arrayKeyValue = split(keyValue, '/');
            let keyType = replace(lowerCase(trim(arrayKeyValue[0])), ' ', '_');
            if (keyType === 'ticket') {
              keyType = 'ticket_id';
            }

            if (keyType === 'size') {
              keyType = 'ticket_size';
            }

            if (keyType === 'type') {
              keyType = 'trade_type';
            }

            if (keyType === 'open_time') {
              arrayKeyValue[1] = join(split(arrayKeyValue[1], '.'), '/');
            }
            return { [keyType]: trim(arrayKeyValue[1]) };
          });

          liveTradeObj = reduce(liveTradeObj, (prev, curr) => ({
            ...prev,
            ...curr,
          }));

          return  {
            ...liveTradeObj,
            user_email: '',
            created_date: new Date(),
          }
        });

        next();
      } catch (error) {
        res.status(500).send(error);
      }
    },
    BulkUpdateLiveTrade
  );

  //: GET ALL
  router.get('/', async (req, res) => {
    try {
      const { query } = req;

      LiveTrade.find(query, function (err, live_trades) {
        res.send({ data: live_trades });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  // Get Closed
  router.get('/', async (req, res) => {
    try {
      const {
        query: { trading_type },
      } = req;

      LiveTrade.find({ trading_type }, function (err, live_trades) {
        res.send({ data: live_trades });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  return router;
};

module.exports = routes;
