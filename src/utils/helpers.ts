import mongoose from 'mongoose';
import { ENV } from '../config';

/**
 * The function isUrlValid checks if a given string is a valid URL.
 * @param string - The `string` parameter is the URL string that you want to check for validity.
 * @returns The function isUrlValid returns a boolean value. It returns true if the input string is a
 * valid URL, and false if it is not a valid URL.
 */
export function isUrlValid(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function isMongoValidationError(error) {
  return error instanceof mongoose.Error.ValidationError;
}

export function getShortLinkUrl(path: string) {
  const url = new URL(path, ENV.BASE_URL);
  return url.toString();
}
