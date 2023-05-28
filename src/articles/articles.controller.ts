import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-post.dto";
import { Article } from "./schemas/article.schema";
import { FindAllArticleRequest } from "./request/find-all-article-request.dto";
import { PaginationResponse } from "src/types";
import { UpdateArticleDto } from "./dto/update-post.dto";
import { FindForListResponse } from "./response/FindForListResponse";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      return await this.articlesService.create(createArticleDto);
    } catch (error) {
      console.log("error", error);
      throw new HttpException("Please check request", HttpStatus.BAD_REQUEST);
    }
  }
  @Post(":id")
  async update(
    @Param("id") id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    try {
      return await this.articlesService.update(id, updateArticleDto);
    } catch (error) {
      throw new HttpException("Please check request", HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  async findAll(
    @Query() request: FindAllArticleRequest
  ): Promise<PaginationResponse<Article>> {
    return this.articlesService.findAll(request);
  }
  @Get("client-list")
  async findForList(
    @Query() request: FindAllArticleRequest
  ): Promise<PaginationResponse<FindForListResponse>> {
    return this.articlesService.findForList(request);
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.articlesService.delete(id);
  }
}
