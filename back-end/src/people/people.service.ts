import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private peopleRepository: Repository<Person>,
  ) {}

  create(createPersonDto: CreatePersonDto, authorProfileUrl: string) {
    const person = this.peopleRepository.create();

    person.isCommitment = true;
    person.authorProfileUrl = authorProfileUrl;
    person.name = createPersonDto.name;
    person.rawText = createPersonDto.rawText;
    person.images = createPersonDto.images.join(';');

    this.peopleRepository.save(person);
  }

  findAll() {
    return this.peopleRepository.find();
  }

  findOne(id: string) {
    return this.peopleRepository.findOne(id);
  }

  update(id: number) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
