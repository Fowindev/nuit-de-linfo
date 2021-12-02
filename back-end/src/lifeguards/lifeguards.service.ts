import { Injectable } from '@nestjs/common';
import { CreateLifeguardDto } from './dto/create-lifeguard.dto';
import { UpdateLifeguardDto } from './dto/update-lifeguard.dto';

@Injectable()
export class LifeguardsService {
  create(createLifeguardDto: CreateLifeguardDto) {
    return 'This action adds a new lifeguard';
  }

  findAll() {
    return `This action returns all lifeguards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lifeguard`;
  }

  update(id: number, updateLifeguardDto: UpdateLifeguardDto) {
    return `This action updates a #${id} lifeguard`;
  }

  remove(id: number) {
    return `This action removes a #${id} lifeguard`;
  }
}
