import { Controller, Get, Path, Route } from "tsoa";
import { IUser } from "../types";
import { User } from "../db/models";

@Route("/users")
export class UserController extends Controller {
  @Get("")
  public async getUsers(): Promise<any> {
    await User.find((err, docs) => {
      if (err) {
        console.error(err);
        return [];
      }
      return docs;
    });
  }

  @Get("/{userId}")
  public async getUser(@Path("userId") userId: string): Promise<any> {
    await User.findOne({ userId }, (err, docs) => {
      if (err) {
        console.error(err);
        return {};
      }
      return docs;
    });
  }
  // TODO: make a post an event
}
