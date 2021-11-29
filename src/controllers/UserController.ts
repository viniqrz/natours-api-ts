import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {
    this.signup = this.signup.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  public async signup(req: Request, res: Response): Promise<void> {
  
    const userDto = req.body;

    const userWithoutPassword = await this.userService.signup(userDto);
    
    res.status(200).json({
      user: userWithoutPassword
    })
  }

  public async authenticate(req: Request, res: Response): Promise<void> {

    const { email, password } = req.body;

    const userAndToken = await this.userService.authenticate(email, password);

    res.status(200).json(userAndToken);
  }
}
