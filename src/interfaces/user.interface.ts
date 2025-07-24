import { Request } from "express";

export interface UserPublicData {
  id: string;
  email: string;
  businessName: string;
  industry: string;
  phone: string;
  profilePicture: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRequest extends Request {
  user?: UserPublicData;
}
