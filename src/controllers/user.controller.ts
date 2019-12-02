import {
  Controller,
  Get,
  Path,
  Route,
  SuccessResponse,
  Post,
  Body,
} from "tsoa";

import { User } from "../db/models";
import { IUser } from "../types";
import { request } from "http";

@Route("/users")
export class UserController extends Controller {
  @Get("")
  public async getUsers(): Promise<any[]> {
    const results = await User.find((err, docs) => {
      if (err) {
        console.error(err);
        return [];
      }
      return docs;
    });

    return results;
  }

  @Get("/{userId}")
  public async getUser(@Path("userId") userId: string): Promise<any> {
    const results = await User.findOne({ userId }, (err, docs) => {
      if (err) {
        console.error(err);
        return {};
      }
      return docs;
    });

    return results;
  }

  @SuccessResponse("201", "Created")
  @Post("")
  public async createUser(@Body() requestBody: IUser): Promise<any> {
    User.create(requestBody);
    this.setStatus(201);
    return requestBody;
  }
}
