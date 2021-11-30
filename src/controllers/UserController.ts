import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {
    this.signup = this.signup.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async signup(req: Request, res: Response): Promise<void> {
  
    const userDto = req.body;

    const userWithoutPassword = await this.userService.signup(userDto);
    
    res.status(200).json({
      status: "success",
      user: userWithoutPassword
    })
  }

  public async authenticate(req: Request, res: Response): Promise<void> {

    const { email, password } = req.body;

    const userAndToken = await this.userService.authenticate(email, password);

    res.status(200).json({
      status: "success",
      data: userAndToken
    });
  }

  public async forgotPassword(req: Request, res: Response): Promise<void> {

    const { email } = req.body;

    await this.userService.forgotPassword(email, req);

    res.status(200).json({
      status: "success",
      message: "Reset token sent to email"
    });
  }
  
  public async resetPassword(req: Request, res: Response): Promise<void> {

    const { token } = req.params;
    const { password } = req.body;

    await this.userService.resetPassword(token, password);

    res.status(200).json({
      status: "success",
      message: "Password succesfully reseted"
    });
  }

  public async getAll(req: Request, res: Response): Promise<void> {
  
    const users = await this.userService.getAll();

    res.status(200).json({
      status: "success",
      data: users
    });
  }

  
  public async getOne(req: Request, res: Response): Promise<void> {

    const { id } = req.params;

    const user = await this.userService.getOne(id);

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  }

  public async update(req: Request, res: Response): Promise<void> {
    
    const { id } = req.params;
    const partial = req.body;

    const user = await this.userService.update(id, partial);

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  }

  public async delete(req: Request, res: Response): Promise<void> {
    
    const { id } = req.params;

    const user = await this.userService.delete(id);

    res.status(200).json({
      status: "success",
      data: {
        user
      }
    })
  }
}
