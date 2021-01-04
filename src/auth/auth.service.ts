import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStructureDto } from './dto/user-structure-dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(userStructure: UserStructureDto): Promise<User> {
    // Process data
    userStructure.username = userStructure.username.toLowerCase();

    return this.userRepository.signUp(userStructure);
  }

  async signIn(authUserDto: UserStructureDto): Promise<boolean> {
    return await this.userRepository.checkedUserPassword(authUserDto);
  }
}
