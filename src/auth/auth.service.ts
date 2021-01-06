import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStructureDto } from './dto/user-structure-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

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

  /**
   * Service for auth signin
   *
   * @param authUserDto
   */
  async signIn(
    authUserDto: UserStructureDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authUserDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
