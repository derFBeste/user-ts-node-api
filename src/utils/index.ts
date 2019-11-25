import { format } from "date-fns";

export const formatTime = (date: Date | number) => format(date, "yyyy-MM-dd");
