import { JwtAdapter, bcryptAdapter, envs } from "../../config"
import { UserModel } from "../../data"
import {
  CustomError,
  RegisterUserDto,
  LoginUserDto,
  UserEntity,
} from "../../domain"
import { EmailService, SendMailOptions } from "./email.service"

export class AuthService {
  // DI
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existsUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existsUser) throw CustomError.badRequest("Email already exist")

    try {
      const user = new UserModel(registerUserDto)

      // Encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password)

      await user.save()

      await this.sendEmailValidationLink(user.email)

      const token = await JwtAdapter.generateToken({ id: user.id })
      if (!token)
        throw CustomError.internalServerError("Error while creating JWT")

      const { password, ...userEntity } = UserEntity.fromObject(user)

      return {
        user: userEntity,
        token,
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

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email })
    if (!token)
      throw CustomError.internalServerError("Error while creating JWT")

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate email</a>
    `

    const options: SendMailOptions = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    }

    const isSent = await this.emailService.sendEmail(options)
    if (!isSent) throw CustomError.internalServerError("Error sending email")

    return true
  }

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token)
    if (!payload) throw CustomError.unauthorized("Invalid token")

    const { email } = payload as { email: string }
    if (!email) throw CustomError.internalServerError("Email not in token")

    const user = await UserModel.findOne({ email })
    if (!user) throw CustomError.internalServerError("Email not exists")

    user.emailValidated = true
    await user.save()

    return true
  }
}
