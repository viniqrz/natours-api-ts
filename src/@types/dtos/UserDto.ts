export interface UserDto {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
  role?: "user" | "guide" | "lead-guide" | "admin";
}

export interface PartialUserDto {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  photo?: string;
}

export interface UserWithoutPassword {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  role: "user" | "guide" | "lead-guide" | "admin";
}

export interface UserAndToken {
  user: UserWithoutPassword;
  token: string;
}

