import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ZodError") {
    return res.status(400).json(err);
  }

  res.status(err.statusCode || 500).json(err);
};

export default errorMiddleware;
