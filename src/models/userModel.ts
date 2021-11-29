import { model, Schema } from "mongoose";
import { User } from "../@types/models/User";

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    maxlength: [30, "Name can't be longer than 80 characters"],
    required: [true, "User must have a name"],
  },
  lastName: {
    type: String,
    maxlength: [50, "Last name can't be longer than 80 characters"],
    required: [true, "User must have a last name"],
  },
  email: {
    type: String,
    maxlength: [80, "Email can't be longer than 80 characters"],
    required: [true, "User must have a last name"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  photo: {
    type: String,
    maxlength: [80, "Email can't be longer than 80 characters"],
  },
});

const userModel = model<User>("User", userSchema);

export { userModel };
