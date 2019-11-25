import { Controller, Get, Path, Route } from "tsoa";
import { IEvent } from "../types";
import { Event } from "../db/models";
import { formatTime } from "../utils";

@Route("/events")
export class EventController extends Controller {
  @Get("")
  public async getEvents(): Promise<any[]> {
    const records = await Event.find((err, docs) => {
      if (err) {
        console.error(err);
        return [];
      }
      return docs;
    });

    return records;
  }

  @Get("users/{userId}")
  public async getUserEvent(@Path("userId") userId: string): Promise<any> {
    // return all events for a single user
    const records = await Event.find((err, docs) => {
      if (err) {
        console.error(err);
        return [];
      }
      return docs;
    });

    return records.filter(item => (item["userId"] = userId));
  }

  // TODO: make a post an event

  @Get("/today")
  public async getTodaysEvents(): Promise<any> {
    const today = formatTime(Date.now());
    const records = await Event.find((err, docs) => {
      if (err) {
        console.error(err);
        return [];
      }
      return docs;
    });

    return records.filter(
      item => formatTime(new Date(item["created"])) === today
    );
  }
}
