import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Modelo } from './modelo.entity';

@Entity({ name: 'tb_marcas' })
export class Marca {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  nome!: string;

  @OneToMany(() => Modelo, (modelo) => modelo.marca)
  modelos!: Modelo[];
}