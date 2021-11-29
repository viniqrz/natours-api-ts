import { Request } from "express";
import { UserWithoutPassword } from "../dtos/UserDto";

export interface IRequest extends Request {
  user: UserWithoutPassword;
}