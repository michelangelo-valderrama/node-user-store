export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = object

    if (!name) return ["Missing name"]

    return [undefined, new CreateCategoryDto(name, available)]
  }
}
