import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStructureDto } from './dto/user-structure-dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userStructure: UserStructureDto): Promise<void> {
    // Process data
    userStructure.username = userStructure.username.toLowerCase();

    return this.userRepository.signUp(userStructure);
  }

  async signIn(authUserDto: UserStructureDto): Promise<string> {
    const user = await this.userRepository.checkedUserPassword(authUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    const username = user.username;
    const payload = { username };

    return this.jwtService.sign(payload);
  }
}
