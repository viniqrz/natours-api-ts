import { Request, Response, NextFunction } from "express";

export class UserController {
  constructor() {
    this.signup = this.signup.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  public async signup(req: Request, res: Response): Promise<void> {
    const userDto = req.body;
  }

  public async authenticate(req: Request, res: Response): Promise<void> {
    const userDto = req.body;
  }
}
