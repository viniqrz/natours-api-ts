import { Model, model, Schema } from "mongoose";
import { User } from "../@types/models/User";
import isEmail from "validator/lib/isEmail";

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
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "User must have a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  photo: {
    type: String,
    maxlength: [80, "Email can't be longer than 80 characters"],
  },
});

const userModel = model<User>("User", userSchema);

export { userModel };
