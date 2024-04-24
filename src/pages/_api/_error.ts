import { NextApiResponse } from "next";

export enum HttpErrorCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
  INTERNAL_SERVER = 500,
}

const HttpCodeToError = new Map([
  [HttpErrorCodes.BAD_REQUEST, 'Bad request'],
  [HttpErrorCodes.UNAUTHORIZED, 'Unauthorized'],
  [HttpErrorCodes.FORBIDDEN, 'Forbidden'],
  [HttpErrorCodes.NOT_FOUND, 'Not found'],
  [HttpErrorCodes.NOT_ALLOWED, 'Method not allowed'],
  [HttpErrorCodes.INTERNAL_SERVER, 'Internal server error'],
]);

export class HttpError extends Error {
  public readonly message: string;
  public readonly statusCode: HttpErrorCodes;
  public readonly error: string;

  constructor(data: Omit<Partial<HttpError>, 'error'>) {
    super(data.message);
    Object.assign(
      this,
      { ...data, error: HttpCodeToError.get(data.statusCode)}
    );
  }
}

export const handleApiError = async (err: any, res: NextApiResponse) => {
  console.log(err);

  return err instanceof HttpError
  ? res.status(err.statusCode).json({ error: err.error, message: err.message, status: err.statusCode })
  : res.status(500).json({ error: 'Internal server error' });
};

