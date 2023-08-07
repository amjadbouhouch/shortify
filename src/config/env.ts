/**
 * ENV is an object that contains configuration parameters for the application.
 * In this case, it defines a `MONGO_URI` property that comes from the environment variables
 * configured on the hosting platform. This variable should contain the URL for connecting
 * to a MongoDB database, which the application will use for persistence.
 */
export const ENV = {
  MONGO_URI: process.env.MONGO_URI,
  SERVER_PORT: parseInt(process.env.SERVER_PORT as string) || 3000,
} as const;
