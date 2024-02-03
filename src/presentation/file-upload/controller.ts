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
    const file = req.body.files[0] as UploadedFile
    const type = req.params.type

    this.fileUploadService
      .uploadSingle(file, type)
      .then((uploaded) => res.json(uploaded))
      .catch((e) => this.handleError(e, res))
  }

  uploadMultipleFiles = async (req: Request, res: Response) => {
    const files = req.body.files as UploadedFile[]
    const type = req.params.type

    this.fileUploadService
      .uploadMultiple(files, type)
      .then((uploaded) => res.json(uploaded))
      .catch((e) => this.handleError(e, res))
  }
}
