import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rescue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean')
  isCommitment: boolean;

  @Column('string')
  authorProfileUrl: string;

  @Column('string')
  title: string;

  @Column({
    type: 'string',
    array: true,
  })
  dates: string[];

  @Column({
    type: 'string',
    array: true,
  })
  images: string[];

  @Column('string')
  peopleRescued: string;

  @Column('text')
  rawText?: string;
}
