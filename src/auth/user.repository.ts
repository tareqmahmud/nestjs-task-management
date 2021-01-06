import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserStructureDto } from './dto/user-structure-dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Repository for handle signup
   *
   * @param authUserDto
   */
  async signUp(authUserDto: UserStructureDto): Promise<void> {
    const { username, password } = authUserDto;

    // Generate the salt
    const salt = await bcrypt.genSalt();

    // Hash the password
    const hashedPassword = await UserRepository.hashPassword(salt, password);

    // User Object
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = hashedPassword;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Sorry the username already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  /**
   * Helper method for hashed a password
   *
   * @param salt
   * @param password
   * @private
   */
  private static async hashPassword(salt, password): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    authUserDto: UserStructureDto,
  ): Promise<string | null> {
    const user = await User.findOne({ username: authUserDto.username });

    if (user && (await user.checkPassword(authUserDto.password))) {
      return user.username;
    }

    return null;
  }
}
