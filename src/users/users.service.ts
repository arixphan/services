import { Injectable } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { hashString } from "src/utils";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createUser: CreateUserDto = {
      ...createCatDto,
      password: await hashString(createCatDto.username),
    };
    return await this.userModel.create(createUser);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}
