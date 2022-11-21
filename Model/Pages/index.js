// This Model is User Model

import { mongoose } from '../../middleware';

//Create Schema  like this below

//Lets Go back to Controller
const Schema = mongoose.Schema;
const pages = new Schema({
  value: { type: String },
  icon: { type: String },
  label: { type: String },
  to: {
    pathname: { type: String },
    state: {
      account: { type: String },
    }
  },
});

//testData is my Collection Name
export default mongoose.model('pages', pages);
