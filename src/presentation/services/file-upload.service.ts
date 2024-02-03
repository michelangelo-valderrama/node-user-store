import type { UploadedFile } from "express-fileupload"
import path from "node:path"
import fs from "node:fs"
import { Uuid } from "../../config"
import { CustomError } from "../../domain"

export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }

  public async uploadSingle(
    file: UploadedFile,
    folder: string = "",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const [, fileExtension] = file.mimetype.split("/")

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
        )
      }

      const destination = path.resolve(
        __dirname,
        "../../../",
        `uploads/${folder}`
      )
      this.checkFolder(destination)

      const fileName = `${this.uuid()}-${
        file.name.split(".")[0]
      }.${fileExtension}`

      file.mv(`${destination}/${fileName}`)

      return { fileName }
    } catch (error) {
      throw error
    }
  }

  public async uploadMultiple(
    files: UploadedFile[],
    folder: string = "",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif"]
  ) {
    try {
      const fileNames = await Promise.all(
        files.map((f) => this.uploadSingle(f, folder, validExtensions))
      )
      return fileNames
    } catch (error) {
      throw error
    }
  }
}
