import { Request, Response } from "express"
import { CustomError } from "../../domain"
import { FileUploadService } from "../services/file-upload.service"
import type { UploadedFile } from "express-fileupload"

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: "Internal Server Error" })
  }

  uploadFile = async (req: Request, res: Response) => {
    const type = req.params.type
    const validTypes = ["users", "products", "categories"]

    if (!validTypes.includes(type)) {
      res
        .status(400)
        .json({ error: `Invalid type: ${type}, valid ones ${validTypes}` })
    }

    const file = req.body.files[0] as UploadedFile

    this.fileUploadService
      .uploadSingle(file, type)
      .then((uploaded) => res.json(uploaded))
      .catch((e) => this.handleError(e, res))
  }

  uploadMultipleFiles = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "UploadMultipleFiles" })
  }
}
