// This Model is User Model

import { mongoose } from '../../middleware';
const beautifyUnique = require('mongoose-beautiful-unique-validation');

//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const postTrades = new Schema({
  ticket_id: { type: String, default: '' },
  user_email: { type: String, default: '' },
  symbol: { type: String, default: '' },
  trade_size: { type: Number, default: 0 },
  trade_type: { type: String, default: 'Closure' },
  trading_type: { type: String, default: 'opened' },
  amount_in_lot: { type: Number, default: '' },
  open_time: { type: String, default: '' },
  open_price: { type: Number, default: 0 },
  close_time: { type: String, default: '' },
  close_price: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
  profit: { type: Number, default: 0 },
  swap: { type: Number, default: 0 },
});

//testData is my Collection Name
postTrades.plugin(beautifyUnique);
export default mongoose.model('post_trades', postTrades);
