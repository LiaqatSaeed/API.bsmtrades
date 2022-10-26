// This Model is User Model

import { mongoose } from '../../middleware';
const beautifyUnique = require('mongoose-beautiful-unique-validation');

//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const traders = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  country: { type: String, default: '' },
  created_date: { type: Date, default: Date.now },
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
});

//testData is my Collection Name
traders.plugin(beautifyUnique);
export default mongoose.model('traders', traders);
