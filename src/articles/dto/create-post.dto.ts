export class CreateArticleDto {
  readonly title: string;
  readonly categories: string[];
  readonly content: string;
  readonly introduction: string;
  readonly status: string;
  readonly coverImageUrl: string;
  readonly contentTree: Array<any>;
  readonly references: Array<string>;
}
