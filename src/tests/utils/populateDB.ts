import { connectToMongo } from "../../db/utils";
import { Event, User } from "../../db/models";

export function populateDB() {
  connectToMongo();

  const user1 = new User({
    email: "ffffff",
    password: "999999",
    phone: "8888888",
    userId: "111111",
  });

  user1.save();

  const event1 = new Event({
    created: new Date(1574443618330),
    eventType: "this is an event",
    userId: "",
  });

  event1.save();
}
