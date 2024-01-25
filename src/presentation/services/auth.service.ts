import { bcryptAdapter } from "../../config"
import { UserModel } from "../../data"
import { CustomError, RegisterUserDto, UserEntity } from "../../domain"

export class AuthService {
  // DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existsUser) throw CustomError.badRequest("Email already exist")

    try {
      const user = new UserModel(registerUserDto)

      // Encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password)

      await user.save()

      // JWT <--- para mantener la autentificación del usuario

      // Email de confirmación

      const { password, ...userEntity } = UserEntity.fromObject(user)

      return {
        user: userEntity,
        token: "ABC",
      }
    } catch (e) {
      throw CustomError.internalServerError(`${e}`)
    }
  }
}
