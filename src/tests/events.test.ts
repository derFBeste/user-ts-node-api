import * as mongoose from "mongoose";

import { events } from "./data/events";
import { Event } from "../db/models";
import { IEvent } from "../types";
import { formatTime } from "../utils";

describe("Events", () => {
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

    // Drop the events collection to start with a fresh collection each time.
    await mongoose.connection.db.dropCollection("events");
  });

  describe("Mongo actions", () => {
    it("should save an Event", async () => {
      const testEvent: IEvent = {
        created: new Date(Date.now()),
        eventType: "event 99",
        userId: "999999",
      };

      const event = new Event(testEvent);
      const savedEvent = await event.save();

      expect(savedEvent._id).toBeDefined();
      expect(savedEvent.eventType).toEqual(testEvent.eventType);
      expect(savedEvent.userId).toEqual(testEvent.userId);
      expect(savedEvent.created).toEqual(testEvent.created);
    });

    it("should insert many events", async () => {
      await Event.insertMany(events);

      const records = await Event.find((err, docs) => {
        if (err) {
          console.error(err);
          return [];
        }
        return docs;
      });
      expect(records.length).toBeGreaterThan(1);
    });

    it("should return all events for all users", async () => {
      const records = await Event.find((err, docs) => {
        if (err) {
          console.error(err);
          return [];
        }
        return docs;
      });
      expect(records.length).toBeGreaterThan(0);
    });

    it("should return all events for a single user", async () => {
      const userId = "111111";
      const records = await Event.find((err, docs) => {
        if (err) {
          console.error(err);
          return [];
        }
        return docs;
      });

      const results = records.filter(item => (item.userId = userId));
      const isAllSameId = results.every(item => item.userId === userId);

      expect(isAllSameId).toBe(true);
    });

    it("should return all events for the last day", async () => {
      const today = formatTime(Date.now());
      const records = await Event.find((err, docs) => {
        if (err) {
          console.error(err);
          return [];
        }
        return docs;
      });

      const results = records.filter(
        item => formatTime(new Date(item.created)) === today
      );
      expect(results.length).toBeGreaterThan(0);
      expect(formatTime(new Date(results[0].created))).toEqual(today);
    });

    it("should compare time from db to format year-month-day", () => {
      const timeString = "2019-11-24T19:58:11.417Z";
      const formated = formatTime(new Date(timeString));
      expect(formated).toBe("2019-11-24");
    });

    it("should have ValidationError if event type is an empty string", () => {
      const testEvent: IEvent = {
        created: new Date(Date.now()),
        eventType: "",
        userId: "999999",
      };

      const event = new Event(testEvent);
      const error = event.validateSync();
      expect(error.name).toEqual("ValidationError");
    });
  });
});
