import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  create(
    @Body() createPersonDto: CreatePersonDto,
    @Headers('Authorization') authorization,
  ) {
    const token =
      typeof authorization === 'string'
        ? authorization.split(' ')[1]
        : undefined;

    if (token) {
      const content = this.jwtService.decode(token);

      if (typeof content === 'object' && content.profileUrl) {
        this.peopleService.create(createPersonDto, content.profileUrl);
      }
    }

    throw new ForbiddenException();
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(String(id));
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.peopleService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
