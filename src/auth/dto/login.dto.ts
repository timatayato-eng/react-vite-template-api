import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "กรุณากรอกอีเมลที่ถูกต้อง" })
  email!: string;

  @IsNotEmpty({ message: "กรุณากรอกรหัสผ่าน" })
  @MinLength(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" })
  password!: string;
}
