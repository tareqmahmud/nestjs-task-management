import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserStructureDto } from './dto/user-structure-dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userStructure: UserStructureDto): Promise<User> {
    const user = new User();
    user.username = userStructure.username;
    user.password = userStructure.password;
    await user.save();

    return user;
  }
}
