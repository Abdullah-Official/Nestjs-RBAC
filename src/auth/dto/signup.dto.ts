import { IsNotEmpty, IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50, { message: 'Passowrd has to be at between 3 and 50 chars' })
  public name: string;


  public roleId: number;
}