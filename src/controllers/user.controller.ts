import { Controller, Get, Path, Route } from "tsoa";

import { User, IUserModel } from "../db/models";

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
}
