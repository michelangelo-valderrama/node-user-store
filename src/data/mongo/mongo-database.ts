import mongoose from "mongoose"

interface Options {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect({ dbName, mongoUrl }: Options) {
    try {
      await mongoose.connect(mongoUrl, { dbName })
      return true
    } catch (e) {
      console.log("Mongo connection error")
      throw e
    }
  }
}
