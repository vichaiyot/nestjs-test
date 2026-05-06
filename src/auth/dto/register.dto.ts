import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Vichaiyot',
    description: 'Username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'vichaiyot@gmail.com',
    description: 'Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '69fb1e87889582739d5c767c',
    description: 'ID',
  })
  @IsString()
  @IsNotEmpty()
  countryId: string;
}
