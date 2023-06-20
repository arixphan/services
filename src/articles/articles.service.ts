import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "./schemas/article.schema";
import { CreateArticleDto } from "./dto/create-post.dto";
import { FindAllArticleRequest } from "./request/find-all-article-request.dto";
import { buildPaginationPipeline } from "src/utils/query";
import { ExtendBase, PaginationResponse } from "src/types";
import { UpdateArticleDto } from "./dto/update-post.dto";
import { FindForListResponse } from "./response/FindForListResponse";
import { convertArticlePath } from "src/utils/url";
import { CategoriesService } from "src/categories/categories.service";
import { CreateCategoriesDto } from "src/categories/dto/create-category.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly ArticleModel: Model<Article>,
    private readonly categoriesService: CategoriesService
  ) {}

  async createNewCategories(articleCategories: string[]) {
    if (articleCategories.length === 0) return;
    const allCategories = await this.categoriesService.findAll();
    const categoriesMap = allCategories.reduce((mapping, cate) => {
      mapping[cate.name] = true;
      return mapping;
    }, {});
    const filteredNewCategories = articleCategories.filter(
      (category) => !categoriesMap[category]
    );

    if (filteredNewCategories.length > 0) {
      await this.categoriesService.create(
        new CreateCategoriesDto(filteredNewCategories)
      );
    }
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = await this.ArticleModel.create(createArticleDto);
    this.createNewCategories(createdArticle.categories);
    return createdArticle;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    this.createNewCategories(updateArticleDto.categories);
    return this.ArticleModel.findByIdAndUpdate(id, updateArticleDto);
  }

  async updateStatus(id: string, status: string) {
    return this.ArticleModel.findByIdAndUpdate(id, { status });
  }

  async findAll(
    request: FindAllArticleRequest
  ): Promise<PaginationResponse<Article>> {
    return this.ArticleModel.aggregate(buildPaginationPipeline(request))
      .exec()
      .then((result) => result?.[0])
      .then((result) => ({
        data: result?.data || [],
        total: result?.total?.[0]?.total || 0,
      }));
  }

  async findForList(
    request: FindAllArticleRequest
  ): Promise<PaginationResponse<FindForListResponse>> {
    const newRequest = { ...request, status: "PUBLIC" };

    return this.ArticleModel.aggregate(
      buildPaginationPipeline<FindAllArticleRequest, ExtendBase<Article>>(
        newRequest,
        [
          "title",
          "introduction",
          "site",
          "categories",
          "_id",
          "createdAt",
          "updatedAt",
        ]
      )
    )
      .exec()
      .then((result) => result?.[0])
      .then((result) => ({
        data: result?.data || [],
        total: result?.total?.[0]?.total || 0,
      }));
  }

  async getArticleUrls(): Promise<string[]> {
    return (await this.ArticleModel.find({ status: "PUBLIC" })).map((item) => {
      return convertArticlePath(item.title, item.id);
    });
  }

  async findOne(id: string): Promise<Article> {
    return this.ArticleModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedArticle = await this.ArticleModel.findByIdAndRemove({
      _id: id,
    }).exec();
    return deletedArticle;
  }
}
