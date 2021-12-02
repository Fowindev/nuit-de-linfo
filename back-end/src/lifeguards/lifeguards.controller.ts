import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LifeguardsService } from './lifeguards.service';
import { CreateLifeguardDto } from './dto/create-lifeguard.dto';
import { UpdateLifeguardDto } from './dto/update-lifeguard.dto';

@Controller('lifeguards')
export class LifeguardsController {
  constructor(private readonly lifeguardsService: LifeguardsService) {}

  @Post()
  create(@Body() createLifeguardDto: CreateLifeguardDto) {
    return this.lifeguardsService.create(createLifeguardDto);
  }

  @Get()
  findAll() {
    return this.lifeguardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lifeguardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLifeguardDto: UpdateLifeguardDto) {
    return this.lifeguardsService.update(+id, updateLifeguardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lifeguardsService.remove(+id);
  }
}
