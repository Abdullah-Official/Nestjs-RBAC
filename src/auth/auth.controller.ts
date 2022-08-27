import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserMenu } from './dto/user-menu';
import { AssignRole } from './dto/assign-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto)  {
    return this.authService.signin(dto);
  }
  @Post('user-menus')
  userMenus(@Body() dto: UserMenu)  {
    return this.authService.userMenus(dto);
  }

  @Post('assign-role')
  assignRole(@Body() dto: AssignRole)  {
    return this.authService.assignRole(dto);
  }
}
