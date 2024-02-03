import { Validators } from "../../../config"

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly avaible: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, avaible, price, description, user, category } = object

    if (!name) return ["Missing name"]

    if (!user) return ["Missing user"]
    if (!Validators.isMongoID(user)) return ["Invalid user id"]

    if (!category) return ["Missing category"]
    if (!Validators.isMongoID(category)) return ["Invalid category id"]

    return [
      undefined,
      new CreateProductDto(name, !!avaible, price, description, user, category),
    ]
  }
}
