import { mongoose } from '../../middleware';
const Schema = mongoose.Schema;
const settings = new Schema({
  email_time_out: [],
  admin_email: { type: String },
  sales_email: { type: String },
  default_id: { type: String, default: 'admin' },
  created_date: { type: Date, default: Date.now },
});
export default mongoose.model('settings', settings);
