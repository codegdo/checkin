import { IsNumber, IsNumberString, IsOptional } from "class-validator";

export class FormDto {
  @IsNumberString()
  formId: number | string;

  @IsNumber()
  @IsOptional()
  filterId: number;

  @IsNumber()
  @IsOptional()
  loginId: number;

  @IsNumber()
  @IsOptional()
  orgId: number;
}
