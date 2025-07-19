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

@Entity("Users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  industry: string;

  @Column()
  businessName: string;

  @Column({ nullable: true })
  profilePicture: string | null;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  generateAccessToken(): string {
    if (!ACCESS_TOKEN_SECRET) {
      throw new Error(
        "TOKEN_SECRET is not defined in your environment variables."
      );
    }

    const payload = this.getPublicData();
    //@ts-ignore
    const options: jwt.SignOptions = { expiresIn: TOKEN_EXPIRY_TIME };

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
      emailVerified: this.emailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
