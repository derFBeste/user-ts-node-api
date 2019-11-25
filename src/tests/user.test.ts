import * as mongoose from "mongoose";

import { users } from "./data/users";
import { User } from "../db/models";
import { IUser } from "../types";

describe("Users", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb://localhost:9002",
      {
        pass: "example",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: "root",
      },
      (err: any) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );

    // Drop the users collection to start with a fresh collection each time.
    await mongoose.connection.db.dropCollection("users");
  });

  describe("Mongo actions", () => {
    it("should save a User", async () => {
      const testUser: IUser = {
        email: "test@test.com",
        password: "999",
        phone: "999-999-9999",
        userId: "999999",
      };

      const user = new User(testUser);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser["email"]).toEqual(testUser.email);
      expect(savedUser["password"]).toEqual(testUser.password);
      expect(savedUser["phone"]).toEqual(testUser.phone);
      expect(savedUser["userId"]).toEqual(testUser.userId);
    });

    it("should insert many users", async () => {
      await User.insertMany(users);

      const records = await User.find((err, docs) => {
        if (err) {
          console.error(err);
          return [];
        }
        return docs;
      });
      expect(records.length).toBeGreaterThan(1);
    });

    it("should have unique email addresses for users", async () => {
      const testUser = {
        email: "a@test.com",
        password: "777",
        phone: "777-777-7777",
        userId: "777777",
      };

      const user = new User(testUser);
      await user.save(err => {
        expect(err.errors["email"].message).toEqual(
          "Error, expected `email` to be unique. Value: `a@test.com`"
        );
      });
    });

    it("should require password", async () => {
      const testUser = {
        email: "test@test.com",
        phone: "999-999-9999",
        userId: "999999",
      };

      const user = new User(testUser);
      await user.save(err => {
        expect(err.errors["password"].message).toEqual(
          "Path `password` is required."
        );
      });
    });

    it("should have valid phone number", () => {
      const badUser = {
        email: "test@example.com",
        password: "1234",
        userId: "999999",
      };
      const badNumber = "3112223333";
      const goodNumber = "923-456-7890";

      const user = new User(badUser);
      user["phone"] = badNumber;
      let error = user.validateSync();

      expect(error.name).toEqual("ValidationError");

      user["phone"] = goodNumber;
      error = user.validateSync();
      expect(error).toBeUndefined();
    });
  });
});
