import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
