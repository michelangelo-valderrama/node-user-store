import jwt from "jsonwebtoken"
import { envs } from "./envs"

const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {
  static generateToken(payload: any, duration: string = "2h") {
    let resolve: (value: unknown) => void

    const promise = new Promise((res) => {
      resolve = res
    })

    jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
      if (err) return resolve(null)
      resolve(token)
    })

    return promise
  }

  static validateToken(token: string) {
    let resolve: (value: unknown) => void

    const promise = new Promise((res) => {
      resolve = res
    })

    jwt.verify(token, JWT_SEED, (err, decoded) => {
      if (err) return resolve(null)
      resolve(decoded)
    })

    return promise
  }
}
