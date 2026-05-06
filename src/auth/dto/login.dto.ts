import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: 'vichaiyot@gmail.com',
    description: 'Email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    example: '123456',
    description: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
