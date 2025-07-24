import { refreshTokenRepository } from "../config/db.config";
import { RefreshToken } from "../entities/refresh-token.entity";
import { GenericService } from "./generic.service";
import * as jwt from "jsonwebtoken";
import {
  REFRESH_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_SECRET,
} from "../config/variables.config";

class RefreshTokenService extends GenericService<RefreshToken> {
  constructor() {
    super(refreshTokenRepository);
  }

  async findAndCreateOrUpdate(userId: string) {
    const existingToken = await this.findOne({ where: { userId } });
    if (existingToken) {
      existingToken.token = this.generateRefreshToken({ doNot: "decode" });
      return await this.update(existingToken.id, existingToken);
    }

    const newToken = await this.create({
      userId,
      token: this.generateRefreshToken({ doNot: "decode" }),
    });
    return newToken;
  }

  async findByToken(token: string) {
    return await this.findOne({ where: { token } });
  }

  generateRefreshToken(payload: object) {
    const options: jwt.SignOptions = {
      //@ts-ignore
      expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
    };

    return jwt.sign(payload, REFRESH_TOKEN_SECRET as jwt.Secret, options);
  }
}

export default new RefreshTokenService();
