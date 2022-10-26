var express = require('express');
var router = express.Router();
import { authError, DBConnection, mongoose, removeEmpty } from '../middleware';
import LiveBalanceHistory from '../Model/LiveBalanceHistory';
import replace from 'lodash/replace';
import split from 'lodash/split';
import lowerCase from 'lodash/lowerCase';
import trim from 'lodash/trim';
import { manageLiveBalanceHistory } from '../Business';

router.use(DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;
  LiveBalanceHistory.findById(
    mongoose.Types.ObjectId(id),
    (err, live_balance_history) => {
      if (err) res.status(500).send(err);
      else {
        req.live_balance_history = live_balance_history;
        next();
      }
    }
  );
});

var routes = () => {
  router.post(
    '/',
    async (req, res, next) => {
      try {
        const { message, subject } = req.body;
        let liveBalanceHistoryObj = {};

        split(message, '\n').map((item) => {
          let ObjectKeyPair = split(item, ' : ');
          let keyType = replace(lowerCase(ObjectKeyPair[0]), ' ', '_');
          liveBalanceHistoryObj[keyType] = trim(ObjectKeyPair[1]);

          return item;
        });

        req.live_balance_history_obj = liveBalanceHistoryObj;

        next();
      } catch (error) {
        res.status(500).send(error);
      }
    },
    manageLiveBalanceHistory
  );

  //: GET ALL
  router.get('/', async (req, res) => {
    try {
      const { query } = req;

      LiveBalanceHistory.find(query, function (err, live_balance_history) {
        res.send({ data: live_balance_history });
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

      LiveBalanceHistory.find(
        { trading_type },
        function (err, live_balance_history) {
          res.send({ data: live_balance_history });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  return router;
};

module.exports = routes;
