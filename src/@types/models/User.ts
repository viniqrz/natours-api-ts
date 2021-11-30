export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
  role: "user" | "guide" | "lead-guide" | "admin";
}
