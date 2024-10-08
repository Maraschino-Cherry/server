import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: AuthDto.Register) {
    const { email, nickname } = registerDto;

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    const hasNickname = await this.userService.findByNickname(nickname);
    if (hasNickname) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    await this.userService.createUser(registerDto);

    return '회원가입이 완료되었습니다.';
  }
}
