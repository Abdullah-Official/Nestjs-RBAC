import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserMenu } from './dto/user-menu';
import { AssignRole } from './dto/assign-role.dto';
// import { jwtSecret } from 'src/utils/constants';
// console.log(jwtSecret)

@Injectable()
export class AuthService {
  constructor(private prsima: PrismaService, private jwt: JwtService) {}

  async signup(dto: SignupDto) {
    const { email, name, password, roleId } = dto;
    const userExists = await this.prsima.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.prsima.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: roleId,
      },
    });

    return { message: 'User created succefully', user };
  }

  async signin(dto: SigninDto) {
    const { email, password } = dto;
    const userExists = await this.prsima.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new BadRequestException('Email or Password is incorrrect.');
    }

    const compareSuccess = await this.comparePasswords({
      password,
      hash: userExists.password,
    });

    if (!compareSuccess) {
      throw new BadRequestException('Email or Password is incorrrect.');
    }

    // sign jwt

    const token = await this.signToken({
      userId: userExists && Number(userExists?.id),
      email: userExists?.email,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    return { message: 'User Logged In Successfully!', user: userExists, token };
  }

  async userMenus(dto: UserMenu) {
    const { userId } = dto;
    try {
      const user = await this.prsima.user.findUnique({ where: { id: userId } });
      if (user) {
        const menus = await this.prsima.menu.findMany({
          where: { roleId: user?.roleId },
        });
        return { menus };
      } else {
        throw new BadRequestException(
          "Can't find the menus because user doesn't exist",
        );
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async assignRole(dto: AssignRole) {
    const { roleId, userId } = dto;
    try {
      const user = await this.prsima.user.findUnique({ where: { id: userId } });
      const role = await this.prsima.role.findUnique({ where: { id: roleId } });
      if (user && role) {
        const roleAssigned = await this.prsima.user.update({
          where: {
            id: userId,
          },
          data: {
            roleId,
          },
        });
        if (!roleAssigned)
          throw new BadRequestException(
            'Something Went Wrong, Cant assign role',
          );

        return { message: 'Role Assigned Successfully!', user: roleAssigned };
      } else {
        throw new BadRequestException("Role or User doesn't exist");
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  // Supporting Functions

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: number; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return token;
  }
}
