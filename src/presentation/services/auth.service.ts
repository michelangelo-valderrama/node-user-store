import { JwtAdapter, bcryptAdapter } from "../../config"
import { UserModel } from "../../data"
import {
  CustomError,
  RegisterUserDto,
  LoginUserDto,
  UserEntity,
} from "../../domain"

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

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email })
    if (!user) throw CustomError.notFound("User not found")

    try {
      const isMatching = bcryptAdapter.compare(
        loginUserDto.password,
        user.password
      )
      if (!isMatching) throw CustomError.badRequest("Incorrect password")

      const { password, ...userEntity } = UserEntity.fromObject(user)

      const token = await JwtAdapter.generateToken({ id: user.id })
      if (!token)
        throw CustomError.internalServerError("Error while creating JWT")

      return {
        ...userEntity,
        token,
      }
    } catch (e) {
      throw CustomError.internalServerError(`${e}`)
    }
  }
}
