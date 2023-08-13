import express from 'express';
import { linkController } from '../controllers';

export const linkRouter = express.Router();
linkRouter.post('/shorten', linkController.shorten);

linkRouter.get('/', linkController.getAll);
// Create a GET request route handler for /health that returns a 200 status code and a 'UP' text response.
linkRouter.get('/health', (_req, res) => {
  res.status(200).send('UP');
});

linkRouter.get('/:shortId', linkController.redirect);
