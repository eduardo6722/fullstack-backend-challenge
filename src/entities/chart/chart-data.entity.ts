import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chart_data' })
export class ChartData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column('varchar')
  color: string;

  @Column('int')
  participation: number;
}
