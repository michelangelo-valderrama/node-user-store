import mongoose from "mongoose"

export class Validators {
  private constructor() {}

  static isMongoID(id: string) {
    return mongoose.isValidObjectId(id)
  }
}
