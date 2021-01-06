import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserStructureDto } from './dto/user-structure-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) userStructure: UserStructureDto,
  ): Promise<void> {
    return this.authService.signUp(userStructure);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authUserDto: UserStructureDto,
  ): Promise<string> {
    return await this.authService.signIn(authUserDto);
  }
}
