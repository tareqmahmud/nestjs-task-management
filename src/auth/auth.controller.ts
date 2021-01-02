import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserStructureDto } from './dto/user-structure-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  async signUp(
    @Body(ValidationPipe) userStructure: UserStructureDto,
  ): Promise<User> {
    return this.authService.signUp(userStructure);
  }
}
