import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./cats/cats.module";
import { ArticlesModule } from "./articles/articles.module";
import { CategoriesModule } from "./categories/categories.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_CONNECTION;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(databaseUrl),
    CatsModule,
    ArticlesModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
