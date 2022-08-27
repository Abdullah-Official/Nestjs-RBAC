import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMenu {
  @IsNotEmpty()
  @IsNumber()
  public roleId: number;

  @IsNotEmpty()
  @IsString()
  public menuName: string;
}