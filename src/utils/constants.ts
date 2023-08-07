export enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  DUPLICATED = 409,
  FORBIDDEN = 403,
  GONE = 410,
  EXPIRED = 498,
}
export const counterUniqueIds = {
  link: 'link',
} as const;
