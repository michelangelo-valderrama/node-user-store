import { Router } from "express"
import { ImageController } from "./controller"
import { ImageService } from "../services/image.service"

export class ImageRoutes {
  static get routes(): Router {
    const router = Router()

    const imageService = new ImageService()

    const controller = new ImageController(imageService)

    router.get("/:type/:img", controller.getImage)

    return router
  }
}
