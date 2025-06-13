import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'text', nullable: false })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;
}
