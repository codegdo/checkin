//import { Exclude } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateMigrationDto { }

export class DeleteMigrationDto { }

export class UpdateMigrationDto { }

export class GetMigrationDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  executionOrder: number;

  @IsBoolean()
  isExecuted: boolean;

  //@Exclude()
  @IsString()
  status: string;
}
