import { Handler } from "./_types";

export const errorWrapper = (handler: Handler) => {
  const original = handler;

  const wrappedHandler: Handler = async (req, res) => {
    try {
      await original(req, res);
    } catch (err) {
      console.error(err);
      return res.status(err.status ?? 500).json({
        message: err.message,
        status: err.status ?? 500,
      });
    }
  }

  return wrappedHandler;
}

class AppError extends Error {
  status: number;
  error: string;
  message: string;
  trace: string;

  constructor(data: Partial<AppError>) {
    super();
    Object.assign(this, data);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super({
      status: 404,
      error: 'Not found',
      message: message,
    });
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super({
      status: 409,
      error: 'Conflict',
      message: message,
    });
  }
}
