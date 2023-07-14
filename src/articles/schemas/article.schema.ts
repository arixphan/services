import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  categories: string[];

  @Prop({
    required: true,
  })
  introduction: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
  })
  site: string;

  @Prop({
    required: true,
  })
  status: string;

  @Prop()
  publishedDate: Date;

  @Prop()
  coverImageUrl: string;

  @Prop()
  contentTree: Array<any>;

  @Prop()
  references: Array<string>;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
