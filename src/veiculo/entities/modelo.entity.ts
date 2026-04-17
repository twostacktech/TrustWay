import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Marca } from './marca.entity';
import { Veiculo } from './veiculo.entity';

@Entity({ name: 'tb_modelos' })
export class Modelo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  nome!: string;

  @ManyToOne(() => Marca, (marca) => marca.modelos, { onDelete: 'CASCADE' })
  marca!: Marca;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.modelo)
  veiculos!: Veiculo[];
}