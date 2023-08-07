import mongoose, { ConnectOptions } from 'mongoose';
import { ENV } from './env';

const options: ConnectOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
};

/**
 * Connects to a MongoDB database using the provided URL
 *
 * @param uri The MongoDB URI to connect to
 * @returns A Mongoose connection instance
 */
export async function connectToDatabase(uri = ENV.MONGO_URI): Promise<mongoose.Connection> {
  if (!uri) {
    throw new Error('MONGO_URI not provided');
  }
  // connect to the database using the provided URI and options
  await mongoose.connect(uri, options);

  // log a successful connection message once connected
  console.log(`Connected to MongoDB`);

  // return the Mongoose connection instance
  return mongoose.connection;
}
