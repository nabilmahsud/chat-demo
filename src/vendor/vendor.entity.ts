import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  emailContact: string;
}
