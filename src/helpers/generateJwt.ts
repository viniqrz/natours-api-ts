import { UserWithoutPassword } from "../@types/dtos/UserDto";
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export function generateJwt(user: UserWithoutPassword, expiresIn: string) {
  return sign({
    data: user
  }, process.env.JWT_TOKEN, { expiresIn });
}