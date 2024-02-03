import { Request, Response } from "express"
import { ImageService } from "../services/image.service"
import path from "node:path"
import fs from "node:fs"

export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  getImage = async (req: Request, res: Response) => {
    const { type = "", img = "" } = req.params

    const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`)

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ message: "Image not found" })
    }

    res.sendFile(imagePath)
  }
}
