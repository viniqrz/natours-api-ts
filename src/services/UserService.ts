import { WrongEmailOrPasswordError } from "../@types/errors/WrongEmailOrPasswordError";
import { PartialUserDto, UserAndToken, UserDto, UserWithoutPassword } from "../@types/dtos/UserDto";
import { UserAlreadyExistsError } from "../@types/errors/UserAlreadyExistsError";
import { IUserService } from "../@types/services/IUserService";
import { compareHash } from "../helpers/compareHash";
import { createHash } from "../helpers/createHash";
import { generateJwt } from "../helpers/generateJwt";
import { userModel } from '../models/userModel';
import { User } from "../@types/models/User";
import { ObjectId } from "mongoose";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { EmptyBodyError } from "../@types/errors/EmptyBodyError";
import { Request } from "express";
import { sendEmail } from "../helpers/sendEmail";
import * as crypto from "crypto";

export class UserService implements IUserService {
  private JWT_EXPIRATION_TIME = '1h';

  public async signup(dto: UserDto): Promise<UserWithoutPassword> {

    const { email, password } = dto;

    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) throw new UserAlreadyExistsError();

    dto.password = await createHash(password);

    const user = await userModel.create(dto);
    const userWithoutPassword = this.omitPassword(user);

    return userWithoutPassword;
  }

  public async authenticate(
    email: string,
    password: string
  ): Promise<UserAndToken> {

    const user = await userModel.findOne({ email });
    if (!user) throw new WrongEmailOrPasswordError();

    const match = await compareHash(password, user.password);
    if (!match) throw new WrongEmailOrPasswordError();

    const userWithoutPassword = this.omitPassword(user);
    const token = generateJwt(userWithoutPassword, this.JWT_EXPIRATION_TIME);

    return { user: userWithoutPassword, token };
  }

  public async forgotPassword(email: string, req: Request): Promise<void> {
    
    const user = await userModel.findOne({ email });
    if (!user) throw new NotFoundError('User');
  
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `
      ${
        req.protocol
      }://${
        req.get('host')
      }/api/v1/users/resetPassword/${resetToken}
    `;
    
    // email
    const subject = `${user.firstName}, here's is your reset-password token.`;
    const body = `Url to reset password with a PATCH request: ${resetUrl}`;

    await sendEmail({ subject, body }, user);
  }

  public async resetPassword(resetToken: string, password: string): Promise<void> {

    const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await userModel
      .findOne({
        passwordResetToken: hash
      });

    if (!user) throw new NotFoundError('user');

    if (user.passwordResetExpires < new Date()) throw new NotFoundError('user');

    user.password = await createHash(password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    console.log('Success!');
  } 

  public async getAll(): Promise<UserWithoutPassword[]> {
    const users = await userModel.find();

    return users.map((u) => this.omitPassword(u));
  }

  public async getOne(id: string): Promise<UserWithoutPassword> {
    const user = await userModel.findById(id);

    if (!user) throw new NotFoundError("User");

    return this.omitPassword(user);
  }

  public async update(
    _id: string,
    partial: PartialUserDto
  ): Promise<UserWithoutPassword> {
    if (Object.keys(partial).length < 1) throw new EmptyBodyError();

    if ('password' in partial) {
      partial.password = await createHash(partial.password);
    }
    
    const user = await userModel.findByIdAndUpdate({ _id }, partial);

    Object.keys(partial).forEach((key) => user[key] = partial[key]);

    return this.omitPassword(user);
  }

  public async delete(id: string): Promise<UserWithoutPassword> {
    return userModel.findByIdAndDelete(id);
  }

  private omitPassword(user: User): UserWithoutPassword {
    const {password, ...userWithoutPassword} = user["_doc"];

    return userWithoutPassword;
  }
}