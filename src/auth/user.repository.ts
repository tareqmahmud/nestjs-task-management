import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserStructureDto } from './dto/user-structure-dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userStructure: UserStructureDto): Promise<User> {
    const user = new User();
    user.username = userStructure.username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashedPassword(
      user.salt,
      userStructure.password,
    );

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Sorry the username already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async hashedPassword(salt, password): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async checkedUserPassword(
    authUserDto: UserStructureDto,
  ): Promise<User | null> {
    const user = await User.findOne({ username: authUserDto.username });

    if (user && (await user.checkPassword(authUserDto.password))) {
      return user;
    }

    return null;
  }
}
