export class UpdateArticleDto {
  readonly title: string;
  readonly categories: string[];
  readonly content: string;
  readonly introduction: string;
  readonly status: string;
  readonly coverImageUrl: string;
  readonly contentTree: Array<any>;
}
