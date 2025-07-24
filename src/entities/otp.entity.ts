import { PrimaryGeneratedColumn, Column } from "typeorm";

export class Otp {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  otp: string;

  @Column()
  email: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date | null;

  @Column({ default: true })
  isValid: boolean;
}