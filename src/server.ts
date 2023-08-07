import cors from 'cors';
import express from 'express';
import { linkRouter } from './routes';
import morgan from 'morgan';

// This function creates an express server instance and returns it.
export function createExpressServer() {
  // Initialize the app variable by creating a new Express application instance.
  const app = express();

  // Set up middleware to parse incoming urlencoded data, enable cors, and parse incoming json data respectively.
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  //
  app.use('/', linkRouter);

  // Handle errors in a centralized way.
  app.use((error, _req, res, _next) => {
    res.status(error.statusCode || 500).send(error.message || '');
  });

  // Disable the "X-Powered-By" response header for security reasons.
  app.disable('x-powered-by');

  // Create a GET request route handler for /health that returns a 200 status code and a 'UP' text response.
  app.get('/health', (_req, res) => {
    res.status(200).send('UP');
  });

  // Return the configured Express application instance.
  return app;
}
