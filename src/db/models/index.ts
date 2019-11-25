import { model, Schema } from "mongoose";
import { isEmpty } from "lodash";
// tslint:disable-next-line: no-var-requires
const uniqueValidator = require("mongoose-unique-validator");

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

export const Event = model("Event", EventSchema);
export const User = model("User", UserSchema);
