var express = require('express');
var router = express.Router();
import find from "lodash/find";
import lowerCase from 'lodash/lowerCase';
import replace from 'lodash/replace';
import split from 'lodash/split';
import map from "lodash/map";
import trim from 'lodash/trim';
import { manageHistory, recordHistory } from '../Business';
import { authError, DBConnection, mongoose, removeEmpty } from '../middleware';
import LiveBalance from '../Model/LiveBalances';
import accounts from "../Constants/accounts.json"

router.use(DBConnection, authError);
router.use(removeEmpty);

router.use('/id/:id', (req, res, next) => {
  const {
    params: { id },
  } = req;
  LiveBalance.findById(mongoose.Types.ObjectId(id), (err, live_balance) => {
    if (err) res.status(500).send(err);
    else {
      req.live_balance = live_balance;
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

        let liveBalanceObj = {};

        split(message, '\n').map((item) => {
          let ObjectKeyPair = split(item, ' : ');
          let keyType = replace(lowerCase(ObjectKeyPair[0]), ' ', '_');
          liveBalanceObj[keyType] = trim(ObjectKeyPair[1]);

          return item;
        });

        req.live_balance_obj = liveBalanceObj;

        next();
      } catch (error) {
        res.status(500).send(error);
      }
    },
    manageHistory
  );

  router.post(
    '/:account',
    async (req, res, next) => {
      try {
        const { message, subject } = req.body;

        let liveBalanceObj = {};

        split(message, '\n').map((item) => {
          let ObjectKeyPair = split(item, ' : ');
          let keyType = replace(lowerCase(ObjectKeyPair[0]), ' ', '_');

          liveBalanceObj[keyType] = trim(ObjectKeyPair[1]);

          return item;
        });

        req.live_balance_obj = liveBalanceObj;

         next();
      } catch (error) {
        res.status(500).send(error);
      }
    },
     manageHistory
  );

  //: GET ALL
  router.get('/', async (req, res) => {
    try {
      let { query } = req;
      
      if (query.account === "all") {
        query = {};
      }

console.log(req.query)
      LiveBalance.find(query, function (err, live_balances) {

        live_balances = map(live_balances, item => {
          const account = find(accounts, (accountItem) => accountItem.account === item.account);
          return {
            ...item._doc,
            account_name: account.name
          }
        })

        res.send({ data: live_balances });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  //: GET ALL
  router.get('/test-history', recordHistory);

  // Get Closed
  router.get('/', async (req, res) => {
    try {
      const {
        query: { trading_type },
      } = req;

      LiveBalance.find({ trading_type }, function (err, live_balances) {
        res.send({ data: live_balances });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });

  return router;
};

module.exports = routes;
