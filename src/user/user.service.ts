import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(registerDto: AuthDto.Register): Promise<UserEntity> {
    const { email, nickname, password } = registerDto;
    const hashedPassword = await hash(password, 10);
    const result = this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
    });
    await this.userRepository.save(result);

    return result;
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOne({ where: { nickname } });
  }
}
