export class CreateCategoriesDto {
  readonly categories: string[];
  constructor(categories: string[]) {
    this.categories = categories;
  }
}
