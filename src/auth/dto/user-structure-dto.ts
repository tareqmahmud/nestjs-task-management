import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserStructureDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string;
}
