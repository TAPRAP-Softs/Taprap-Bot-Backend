import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import * as jwt from "jsonwebtoken";
import { UserPublicData } from "../interfaces/user.interface";
import {
  ACCESS_TOKEN_SECRET,
  TOKEN_EXPIRY_TIME,
} from "../config/variables.config";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  industry: string;

  @Column()
  businessName: string;

  @Column()
  profilePicture: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  generateAccessToken(): string {
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error(
        "TOKEN_SECRET is not defined in your environment variables."
      );
    }

    const payload = this.getPublicData();
    const options: jwt.SignOptions = { expiresIn: Number(TOKEN_EXPIRY_TIME) };

    return jwt.sign(payload, ACCESS_TOKEN_SECRET as jwt.Secret, options);
  }

  getPublicData(): UserPublicData {
    return {
      id: this.id,
      email: this.email,
      businessName: this.businessName,
      industry: this.industry,
      phone: this.phone,
      profilePicture: this.profilePicture,
    };
  }
}
