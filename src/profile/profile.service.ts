import {
  Injectable,
  NotFoundException,
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
  getInfo(id: number) {
    const profile: MockProfile | undefined = findProfileById(id);

    if (!profile) {
      throw new NotFoundException("ไม่พบ profile");
    }

    return { data: profile };
  }

}
