import {
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get("me")
  getMe(@Headers("authorization") authorization?: string) {
    return this.profileService.getMe(authorization);
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.profileService.getById(id);
  }
}
