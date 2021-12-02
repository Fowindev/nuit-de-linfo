import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lifeguard } from 'src/lifeguards/entities/lifeguard.entity';

@Entity()
export class Rescue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  isCommitment: boolean;

  @Column('string')
  title: string;

  @Column('string')
  date: string;

  @Column('int8')
  peopleRescued: number;

  @Column('int8')
  peopleDeceased: number;

  @Column('text')
  rawText?: string;

  @Column({
    type: 'string',
    array: true,
  })
  unreferencedLifeguards?: string[];

  @ManyToMany(() => Lifeguard, (lifeguard) => lifeguard.rescues)
  @JoinTable()
  lifeguards?: Lifeguard[];
}
