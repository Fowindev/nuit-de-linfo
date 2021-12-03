import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isCommitment: boolean;

  @Column()
  authorProfileUrl: string;

  @Column()
  name: string;

  @Column({
    length: 5000,
  })
  rawText?: string;

  @Column()
  images?: string;
}
