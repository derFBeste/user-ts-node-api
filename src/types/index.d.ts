export interface IEvent {
  eventType: string;
  userId: string;
  created: Date;
}

export interface IUser {
  email: string; // must be unique
  password: string;
  phone?: string;
  userId: string;
}
