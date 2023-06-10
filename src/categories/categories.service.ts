import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./schemas/category.schema";
import { CreateCategoriesDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>
  ) {}

  async create(createCatDto: CreateCategoriesDto): Promise<Category[]> {
    const newCategories: Category[] = [];
    createCatDto.categories.map((category) => {
      const newCategory = new Category();
      newCategory.name = category;
      newCategories.push(newCategory);
    });
    console.log("newCategories", newCategories);
    return await this.categoryModel.create(newCategories);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const createdCategory = await this.categoryModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return createdCategory;
  }
}
