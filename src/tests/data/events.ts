import { IEvent } from "../../types";

export const events: IEvent[] = [
  { created: new Date(Date.now()), eventType: "event 1", userId: "111111" },
  { created: new Date(1574529496673), eventType: "event 2", userId: "111111" },
  { created: new Date(1574529483042), eventType: "event 3", userId: "333333" },
  { created: new Date(1574529519824), eventType: "event 1", userId: "222222" },
  { created: new Date(1574529496673), eventType: "event 3", userId: "555555" },
  { created: new Date(1574529562278), eventType: "event 9", userId: "555555" },
  { created: new Date(Date.now()), eventType: "event9", userId: "555555" },
];
