import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  completed?: boolean;

  @Column({ nullable: true })
  user_id: number;
}
