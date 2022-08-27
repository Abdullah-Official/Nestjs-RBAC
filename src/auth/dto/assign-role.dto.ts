import { IsNotEmpty, IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class AssignRole {
  @IsNotEmpty()
  @IsNumber()
  public userId: number;

  @IsNotEmpty()
  @IsNumber()
  public roleId: number;
}