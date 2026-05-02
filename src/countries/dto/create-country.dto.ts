import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    example: 'Thailand',
    description: 'Country name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'TH',
    description: 'Country code',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 3)
  code: string;
}
