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

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly ArticleModel: Model<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = await this.ArticleModel.create(createArticleDto);
    return createdArticle;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    return this.ArticleModel.findByIdAndUpdate(id, updateArticleDto);
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
    return this.ArticleModel.aggregate(
      buildPaginationPipeline<FindAllArticleRequest, ExtendBase<Article>>(
        request,
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
