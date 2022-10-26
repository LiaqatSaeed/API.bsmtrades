// This Model is User Model

import { mongoose } from '../../middleware';
const beautifyUnique = require('mongoose-beautiful-unique-validation');
//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const permissions = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: 'Permission ({VALUE}) is already taken!',
    uniqueCaseInsensitive: true,
  },
  all_page_access: { type: Boolean },
  pages: [],
  all_group_access: { type: Boolean },
  groups: [],
  all_instrument_access: { type: Boolean },
  instruments: [],
  type: { type: String },
  created_by: { type: mongoose.Schema.ObjectId },
  created_date: { type: Date, default: Date.now },
});

permissions.plugin(beautifyUnique);
//testData is my Collection Name
export default mongoose.model('permissions', permissions);
