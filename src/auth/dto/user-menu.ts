import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserMenu {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;
}