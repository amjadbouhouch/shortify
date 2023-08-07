import { model, Schema } from 'mongoose';
import { LinkType } from '../types';
import CounterModel from './counter.model';
import { counterUniqueIds } from '../utils/constants';

const linkSchema = new Schema<LinkType>(
  {
    originalUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clicks: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  { timestamps: true },
);
// Pre-save middleware
linkSchema.pre('validate', async function (next) {
  // increment the counter for each new link
  const currentCounter = await CounterModel.findOneAndUpdate({ _id: counterUniqueIds.link }, { $inc: { count: 1 } }, { upsert: true, new: true });
  // generate a unique id short url
  // number to hexadecimal
  this.shortUrl = currentCounter.count.toString(16);
  next();
});

const LinkModel = model<LinkType>('link', linkSchema);
export default LinkModel;
