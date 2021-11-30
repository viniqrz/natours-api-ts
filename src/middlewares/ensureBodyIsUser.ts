import { NextFunction, Request, Response } from "express";
import { RoleNotAllowedError } from "../@types/errors/RoleNotAllowedError";

export function ensureBodyIsUser(req: Request, res: Response, next: NextFunction) {
  try {
    if ("role" in req.body) {
      const bodyIsUser = req.body.role === 'user';

      if (!bodyIsUser) throw new RoleNotAllowedError('non-registered');
    }

    next();
  } catch(err) {
    next(err);
  }
}