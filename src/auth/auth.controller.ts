import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserStructureDto } from './dto/user-structure-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) userStructure: UserStructureDto,
  ): Promise<User> {
    return this.authService.signUp(userStructure);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authUserDto: UserStructureDto,
  ): Promise<boolean> {
    return await this.authService.signIn(authUserDto);
  }
}
