import { DuplicatedError } from '../errors';
import LinkModel from '../models/link.model';
import { LinkType } from '../types';

type CreateParams = Omit<LinkType, '_id' | 'shortUrl'>;

//
/**
 * The function creates a new link with the provided original URL and throws an error if a link with
 * the same URL already exists.
 * @param {CreateParams}  - The `create` function takes an object as a parameter with a property
 * `originalUrl`. This property represents the original URL that the user wants to create a shortened
 * link for.
 * @returns the newly created link object.
 */
export async function create({ originalUrl }: CreateParams) {
  try {
    const newLink = await LinkModel.create({
      originalUrl,
    });

    return newLink;
  } catch (error: any) {
    if (error?.code === 11000) {
      throw new DuplicatedError('Link already exists');
    }
  }
}

export async function insertMany(links) {
  return LinkModel.insertMany(links);
}

export async function getAll(params = {}) {
  return LinkModel.find({});
}

export async function getLinkByShortId(shortUrl: string) {
  return LinkModel.findOne({ shortUrl });
}

export async function incrementClicks(_id: string) {
  return LinkModel.findByIdAndUpdate(_id, { $inc: { clicks: 1 } });
}
