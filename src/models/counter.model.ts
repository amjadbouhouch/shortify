import { model, Schema } from 'mongoose';

const counterSchema = new Schema({
  // counterUniqueIds
  _id: { type: String, required: true },
  count: { type: Number, default: 0 },
});
const CounterModel = model('counter', counterSchema);
export default CounterModel;
