import { Article } from "../schemas/article.schema";

export type FindForListResponse = Omit<Article, "content">;
