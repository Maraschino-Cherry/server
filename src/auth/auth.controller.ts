import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/login')
  async login(@Body() loginDto: AuthDto.Login) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일을 확인해주세요!');
    }

    const isSamePassword = compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요!');
    }

    return '로그인 완료';
  }
}
