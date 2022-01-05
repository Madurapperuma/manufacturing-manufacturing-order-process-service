import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public.Employee')
export default class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  designation: string;

  @Column({ nullable: true })
  city: string;

  @Column()
  projectId: string;

  @Column()
  locationId: string;

  toPlain() {
    return { ...this };
  }
}
