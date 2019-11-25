import { Controller, Get, Path, Route, Query } from "tsoa";

import { Event, IEventModel } from "../db/models";
import { formatTime } from "../utils";

@Route("/events")
export class EventController extends Controller {
  @Get("/")
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

  @Get("/users/{userId}")
  public async getUserEvent(@Path("userId") userId: string): Promise<any> {
    const records = await Event.findOne({ userId }, (err, docs) => {
      if (err) {
        console.error(err);
        return [];
      }
      return docs;
    });

    return records;
  }

  @Get("/today")
  public async getTodaysEvents(@Query() timeFrame = "today"): Promise<any[]> {
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
