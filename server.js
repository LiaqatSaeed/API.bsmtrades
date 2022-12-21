//region References
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

const app = express();

app
  .use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
    })
  )
  .use(bodyParser.json({ limit: '50mb', extended: true }))
  .use(
    cors({
      //credentials: true,
      //  origin: ENVIRONMENT === "dev" ? FRONT_END_URL_DEV : FRONT_END_URL_PROD, // URL of the react (Frontend) app
    })
  );

app.get('/api', (req, res) => {
  res.json({ status: 'OK' });
});

var authController = require('./Controller/AuthController.js')();
var userController = require('./Controller/UserController.js')();
var permissionController = require('./Controller/permissionController.js')();
var postTradesController = require('./Controller/PostTradesController.js')();
var tradersController = require('./Controller/TradersController.js')();
var tradeQueueController = require('./Controller/TradeQueueController.js')();
var liveBalanceController = require('./Controller/LiveBalanceController.js')();
var liveBalanceHistoryController =
  require('./Controller/LiveBalanceHistoryController.js')();
var liveTradeController = require('./Controller/LiveTradeController.js')();
var PagesController = require('./Controller/PagesController')();

app.use('/api', authController);
app.use('/api/users', userController);
app.use('/api/permissions', permissionController);
app.use('/api/post-trades', postTradesController);
app.use('/api/traders', tradersController);
app.use('/api/trade-queue', tradeQueueController);
app.use('/api/live-trade', liveTradeController);
app.use('/api/live-balance', liveBalanceController);
app.use('/api/live-balance-history', liveBalanceHistoryController);
app.use('/api/user-accounts', PagesController);

const server = require('http').createServer(app);

server.listen(PORT, () => {
  console.log('API BSMTrades.com API Running ' + PORT);
});
