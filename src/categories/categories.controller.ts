import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoriesDto } from "./dto/create-category.dto";
import { Category } from "./schemas/category.schema";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  async create(@Body() createCategoriesDto: CreateCategoriesDto) {
    try {
      return await this.categoriesService.create(createCategoriesDto);
    } catch (error) {
      throw new HttpException("Please check request", HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoriesService.delete(id);
  }
}
