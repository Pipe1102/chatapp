import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export const SECRET_KEY: Secret = process.env.TOKEN_SECRET || "secret";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (decoded) {
        res.locals.user = decoded;
        next();
      } else {
        return res.status(403).json({ message: "Token expired" });
      }
    });
  } catch (error) {}
};
