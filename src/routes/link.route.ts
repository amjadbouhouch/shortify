import express from 'express';
import { linkController } from '../controllers';

export const linkRouter = express.Router();
linkRouter.post('/shorten', linkController.shorten);

linkRouter.get('/', linkController.getAll);
linkRouter.get('/:shortId', linkController.redirect);
