import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rescue } from 'src/rescues/entities/rescue.entity';

@Entity()
export class Lifeguard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string')
  firstName: string;

  @Column('string')
  lastName: string;

  @Column('string')
  birthDate?: string;

  @Column('string')
  deathDate?: string;

  @Column('string')
  mainRole?: string;

  @Column('text')
  rawText?: string;

  @ManyToMany(() => Rescue, (rescue) => rescue.lifeguards)
  rescues: Rescue[];
}
