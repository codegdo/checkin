import { IsOptional, IsPositive } from 'class-validator';

export class PagingQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
