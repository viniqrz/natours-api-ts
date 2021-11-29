import { WrongEmailOrPasswordError } from "../@types/errors/WrongEmailOrPasswordError";
import { UserAndToken, UserDto, UserWithoutPassword } from "../@types/dtos/UserDto";
import { UserAlreadyExistsError } from "../@types/errors/UserAlreadyExistsError";
import { IUserService } from "../@types/services/IUserService";
import { compareHash } from "../helpers/compareHash";
import { createHash } from "../helpers/createHash";
import { generateJwt } from "../helpers/generateJwt";
import { userModel } from '../models/userModel';
import { User } from "../@types/models/User";

export class UserService implements IUserService {
  private JWT_EXPIRATION_TIME = '1h';

  public async signup(dto: UserDto): Promise<UserWithoutPassword> {

    const { email, password } = dto;

    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) throw new UserAlreadyExistsError();

    dto.password = await createHash(password);

    const user = await userModel.create({ dto });
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

  private omitPassword(user: User): UserWithoutPassword {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
  }
}