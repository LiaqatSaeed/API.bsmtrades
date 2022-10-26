// This Model is User Model

import { mongoose } from '../../middleware';
const beautifyUnique = require('mongoose-beautiful-unique-validation');

//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const liveBalances = new Schema({
  balance: { type: Number },
  equity: { type: Number },
  created_date: { type: Date, default: Date.now },
});

//testData is my Collection Name
liveBalances.plugin(beautifyUnique);
export default mongoose.model('live_balance', liveBalances);
