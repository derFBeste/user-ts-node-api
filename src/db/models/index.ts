import { model, Schema, Document, Model } from "mongoose";
import { isEmpty } from "lodash";
import { IEvent, IUser } from "../../types";
// tslint:disable-next-line: no-var-requires
const uniqueValidator = require("mongoose-unique-validator");

export interface IEventModel extends IEvent, Document {}
export interface IUserModel extends IUser, Document {}

export const EventSchema: Schema = new Schema({
  created: Date,
  eventType: {
    required: true,
    type: String,
    validator: input => !isEmpty(input),
  },
  userId: String,
});

export const UserSchema: Schema = new Schema({
  email: {
    index: true,
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    type: String,
    validate: {
      validator: input => /\d{3}-\d{3}-\d{4}/.test(input),
    },
  },
  userId: String,
});

UserSchema.plugin(uniqueValidator);

export const Event: Model<IEventModel> = model<IEventModel>(
  "Event",
  EventSchema
);
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
