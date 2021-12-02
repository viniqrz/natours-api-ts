export interface UserDto {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo?: string;
  role?: "user" | "guide" | "lead-guide" | "admin";
}

export interface PartialUserDto {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
}

export interface UserWithoutPassword {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role: "user" | "guide" | "lead-guide" | "admin";
}

export interface UserAndToken {
  user: UserWithoutPassword;
  token: string;
}

