import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500);
  res.json({ message: err.name + ': ' + err.message });
}
