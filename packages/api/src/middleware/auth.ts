import { Request, Response, NextFunction } from "express";
import db from "../drizzle";
import { authToken } from "../drizzle/schema/authToken";
import { eq } from "drizzle-orm";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  const token = await db
    .select()
    .from(authToken)
    .where(eq(authToken.token, authorization));

  if (token.length === 0)
    return res.status(401).json({ message: "Unauthorized" });

  next();
};

export default auth;
