import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMomentDto {
  @IsNumber()
  @IsLongitude()
  pinX: number;

  @IsNumber()
  @IsLatitude()
  pinY: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsUrl()
  youtubeUrl: string;

  @IsString()
  music: string;

  @IsString()
  artist: string;
}
