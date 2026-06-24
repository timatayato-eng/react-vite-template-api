import { Injectable, UnauthorizedException } from "@nestjs/common";
import { findProfileByCredentials } from "../data/mock-profiles";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  health() {
    return { status: "ok", message: "API is running" };
  }

  login(dto: LoginDto) {
    const profile = findProfileByCredentials(dto.email, dto.password);

    if (!profile) {
      throw new UnauthorizedException("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }

    const token = Buffer.from(
      `${profile.id}:${profile.email}:${Date.now()}`,
    ).toString("base64");

    return {
      accessToken: token,
      data: {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
      },
    };
  }
}
