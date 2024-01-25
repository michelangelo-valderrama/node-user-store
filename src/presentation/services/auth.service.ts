import { UserModel } from "../../data"
import { CustomError, RegisterUserDto } from "../../domain"

export class AuthService {
  // DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existsUser) throw CustomError.badRequest("Email already exist")

    return "ok"
  }
}
