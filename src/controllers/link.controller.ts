import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors';
import { linkService } from '../services';
import { isUrlValid } from '../utils/helpers';

/**
 * The `shorten` function takes a request, validates the original URL, creates a new shortened URL
 * using the `linkService`, and sends the new URL as a response.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and body.
 * @param {Response} response - The `response` parameter is an object that represents the HTTP response
 * that will be sent back to the client. It is used to send the shortened URL back to the client as the
 * response body.
 */
export async function shorten(req: Request, response: Response) {
  if (!isUrlValid(req.body?.originalUrl)) {
    throw new BadRequestError('Invalid originalUrl');
  }
  const newUrl = await linkService.create(req.body);
  response.send(newUrl);
}
/**
 * The `redirect` function redirects the user to the original URL associated with a given short ID.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and parameters.
 * @param {Response} response - The `response` parameter is an object that represents the HTTP response
 * that will be sent back to the client. It is used to send the response data, set headers, and perform
 * other operations related to the response. In this code snippet, the `response` object is used to
 * redirect the client to
 */
export async function redirect(req: Request, response: Response) {
  const shortId = req.params?.shortId;
  if (!shortId) {
    throw new BadRequestError();
  }
  const link = await linkService.getLinkByShortId(shortId);
  if (!link) {
    throw new NotFoundError();
  }

  linkService.incrementClicks(link._id);

  response.redirect(link.originalUrl);
}

// export async function createMany(req: Request, response: Response) {
//   const newUrl = await linkService.insertMany(req.body);
//   response.send(newUrl);
// }

export async function getAll(req: Request, response: Response) {
  const links = await linkService.getAll();
  response.send(links);
}
