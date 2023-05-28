import { BaseListQuery } from "src/utils/query";
import { Article } from "../schemas/article.schema";

export type FindAllArticleRequest = BaseListQuery<Article>;
