import { UserRole } from "@/lib/auth-utils";

export type UserInfo = {
  name?: string;
  email: string;
  role: UserRole;
  avatar?: string;
};
