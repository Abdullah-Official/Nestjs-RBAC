import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenu } from './dto/create-menu';

@Injectable()
export class MenuService {
  constructor(private prsima: PrismaService) {}

  async createMenu(dto: CreateMenu) {
    const { roleId, menuName } = dto;
    try {
      const menu = await this.prsima.menu.create({
        data: {
          roleId,
          menuName,
        },
      });
      if (menu) {
        return { message: 'User created succefully', menu };
      } else {
        throw new BadRequestException('Menu Created Successfully! ');
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
