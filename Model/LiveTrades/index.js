// This Model is User Model

import { mongoose } from '../../middleware';
const beautifyUnique = require('mongoose-beautiful-unique-validation');

//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const liveTrades = new Schema({
  ticket_id: { type: String, default: '' },
  symbol: { type: String, default: '' },
  trade_size: { type: Number, default: 0 },
  trade_type: { type: String, default: 'Closure' },
  trading_type: { type: String, default: 'opened' },
  open_time: { type: String, default: '' },
  open_price: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now },
  profit: { type: Number, default: 0 },
  swap: { type: Number, default: 0 },
});

//testData is my Collection Name
liveTrades.plugin(beautifyUnique);
export default mongoose.model('live_trades', liveTrades);
