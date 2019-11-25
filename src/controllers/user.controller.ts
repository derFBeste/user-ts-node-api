import { Controller, Get, Path, Route } from "tsoa";
import { IUser } from "../types";
import { User } from "../db/models";

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

  // TODO: make a get user

  @Get("/{userId}")
  public async getUser(@Path("userId") userId: string) {
    // return a single user
    return { userId: "77777777", events: ["some event 1", "some event 2"] };
  }
  // TODO: make a post an event
}
