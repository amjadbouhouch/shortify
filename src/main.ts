import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import http from 'http';
import { AddressInfo } from 'net';
import { connectToDatabase, ENV } from './config';
import { createExpressServer } from './server';

Object.keys(ENV).forEach((key) => {
  if (!ENV[key]) {
    console.warn(`missing env variable for ${key}`);
  }
});

// This function bootstraps and starts the configured Express server to begin listening for incoming requests.
async function bootstrap() {
  const connection = await connectToDatabase();
  // Create a new instance of an Express server by calling createExpressServer function.
  const app = createExpressServer();

  // Create an http server instance with the created express application instance and start listening on the specified port/IP address.
  const server = http.createServer(app).listen(ENV.SERVER_PORT, 'localhost', () => {
    const addressInfo = server.address() as AddressInfo;
    console.log(`Server running at http://${addressInfo.address}:${addressInfo.port}`);
  });

  // Set up signal trap handlers to gracefully shutdown the server if any of the specified signals are received.
  const signalsTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

  signalsTraps.forEach((type) => {
    process.once(type, () =>
      server.close(() => {
        console.log('Http server closed');
        connection.close();
        console.log('disconnection from database');
        process.exit();
      }),
    );
  });
}

bootstrap();
