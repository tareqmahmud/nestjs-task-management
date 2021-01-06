import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserStructureDto } from './dto/user-structure-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user-decorator';
import { User } from './user.entity';

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
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authUserDto);
  }
}
