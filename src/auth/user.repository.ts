import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserStructureDto } from './dto/user-structure-dto';
import * as bcrypt from 'bcrypt';

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

    await user.save();

    return user;
  }

  async hashedPassword(salt, password): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async checkedUserPassword(authUserDto: UserStructureDto): Promise<boolean> {
    const user = await User.findOne({ username: authUserDto.username });

    if (user && (await user.checkPassword(authUserDto.password))) {
      return true;
    }

    return null;
  }
}
