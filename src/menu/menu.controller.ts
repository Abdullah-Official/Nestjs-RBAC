import { Body, Controller, Post } from '@nestjs/common';
import { CreateMenu } from './dto/create-menu';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  signup(@Body() dto: CreateMenu) {
    return this.menuService.createMenu(dto);
  }
}
