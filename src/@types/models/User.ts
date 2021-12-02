export interface User {
  name: string;
  email: string;
  password: string;
  photo?: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createPasswordResetToken(): string;
}
