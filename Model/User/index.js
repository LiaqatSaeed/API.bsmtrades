// This Model is User Model

import { mongoose } from '../../middleware';
const beautifyUnique = require('mongoose-beautiful-unique-validation');

//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const users = new Schema({
  user_name: { type: String, uniqueCaseInsensitive: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: { type: String },
  is_active: { type: Boolean },
  role: { type: String, default: 'user' },
  created_date: { type: Date, default: Date.now },
  login_type: { type: String },
  avatar: { type: String },
  phone_number: { type: String },
  dob: { type: Date },
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
});

//testData is my Collection Name
users.plugin(beautifyUnique);
export default mongoose.model('users', users);
