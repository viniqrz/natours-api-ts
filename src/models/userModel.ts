import { Model, model, Schema } from "mongoose";
import { User } from "../@types/models/User";
import isEmail from "validator/lib/isEmail";

import * as dayjs from 'dayjs';
import * as crypto from 'crypto';

const userSchema = new Schema<User>({
  name: {
    type: String,
    maxlength: [50, "Last name can't be longer than 80 characters"],
    required: [true, "User must have a name"],
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetToken = hash;

  console.log({ resetToken, passwordResetToken: hash });

  this.passwordResetExpires = dayjs().add(10, 'minute').toDate();

  return resetToken;
}

const UserModel = model<User>("User", userSchema);

export { UserModel };
