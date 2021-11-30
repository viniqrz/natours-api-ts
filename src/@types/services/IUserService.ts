import { Request } from "express";
import { PartialUserDto, UserDto } from "../dtos/UserDto";
import { UserWithoutPassword } from "../dtos/UserDto";
import { UserAndToken } from "../dtos/UserDto";
import { User } from "../models/User";

export interface IUserService {
  signup(dto: UserDto): Promise<UserWithoutPassword>;
  authenticate(email: string, password: string): Promise<UserAndToken>;
  forgotPassword(email: string, req: Request): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
  getAll(): Promise<UserWithoutPassword[]>;
  getOne(id: string): Promise<UserWithoutPassword>;
  update(id: string, partial: PartialUserDto): Promise<UserWithoutPassword>;
  delete(id: string): Promise<UserWithoutPassword>;
}