import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./schemas/article.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { CategoriesService } from "src/categories/categories.service";
import {
  Category,
  CategorySchema,
} from "src/categories/schemas/category.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, CategoriesService],
})
export class ArticlesModule {}
