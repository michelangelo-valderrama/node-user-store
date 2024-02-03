import { Request, Response } from "express"
import { CustomError, PaginationDto } from "../../domain"
import { ProductService } from "../services/product.service"

export class ProductController {
  constructor(public productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    console.log(`${error}`)
    return res.status(500).json({ error: "Internal Server Error" })
  }

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({ error })

    res.status(200).json({ message: "OK" })
    // this.productService
    //   .getProducts(paginationDto!)
    //   .then((categories) => res.status(200).json(categories))
    //   .catch((e) => this.handleError(e, res))
  }

  createProducts = async (req: Request, res: Response) => {
    res.status(200).json({ message: "create product" })
  }
}
