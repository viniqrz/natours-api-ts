import { PartialUserDto, UserDto } from "../dtos/UserDto";
import { UserWithoutPassword } from "../dtos/UserDto";
import { UserAndToken } from "../dtos/UserDto";

export interface IUserService {
  signup(dto: UserDto): Promise<UserWithoutPassword>;
  authenticate(email: string, password: string): Promise<UserAndToken>;
  getAll(): Promise<UserWithoutPassword[]>;
  getOne(id: string): Promise<UserWithoutPassword>;
  update(id: string, partial: PartialUserDto): Promise<UserWithoutPassword>;
  delete(id: string): Promise<UserWithoutPassword>;
}