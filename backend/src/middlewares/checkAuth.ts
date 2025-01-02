import { error500 } from "@/constants";
import { ValidateError } from "@/core/application/errors";
import { verifyAuthorization } from "@/scripts";
import { Request, Response, NextFunction, RequestHandler } from "express";

const checkAuth = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const authObj = await verifyAuthorization({ authHeader });
    req.user = authObj;
    next();
  } catch (e: unknown) {
    if (e instanceof ValidateError) {
      return res.status(e.status).json({ message: e.message, data: null });
    }

    return res.status(500).json(error500);
  }
}) as RequestHandler;

export default checkAuth;
