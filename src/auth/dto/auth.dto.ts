import { IsEmail, IsString, Length } from 'class-validator';

export namespace AuthDto {
  export class Register {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 12)
    password: string;

    @IsString()
    @Length(2, 6)
    nickname: string;
  }
  export class Login {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 12)
    password: string;
  }
}
