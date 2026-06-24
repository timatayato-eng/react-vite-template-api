import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  findProfileById,
  type MockProfile,
} from "../data/mock-profiles";

export interface PublicProfile {
  id: number;
  email: string;
  name: string;
  role: MockProfile["role"];
}

@Injectable()
export class ProfileService {
  getById(id: number) {
    const profile = findProfileById(id);

    if (!profile) {
      throw new NotFoundException("ไม่พบ profile");
    }

    return { data: this.toPublicProfile(profile) };
  }

  getMe(authorization?: string) {
    const userId = this.parseUserIdFromToken(authorization);
    return this.getById(userId);
  }

  private toPublicProfile(profile: MockProfile): PublicProfile {
    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
    };
  }

  private parseUserIdFromToken(authorization?: string): number {
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("กรุณาเข้าสู่ระบบ");
    }

    const token = authorization.slice("Bearer ".length);

    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const [idStr] = decoded.split(":");
      const id = Number(idStr);

      if (!id || Number.isNaN(id)) {
        throw new Error("invalid token");
      }

      return id;
    } catch {
      throw new UnauthorizedException("token ไม่ถูกต้อง");
    }
  }
}
