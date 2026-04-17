import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Modelo } from './modelo.entity';

@Entity({ name: 'tb_veiculo' })
export class Veiculo {
  @PrimaryColumn({ length: 7 })
  placa!: string; // Ex: ABC1D23

  @Column({ type: 'int', nullable: false })
  ano!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  precoFip!: number;

  @ManyToOne(() => Modelo, (modelo) => modelo.veiculos, { onDelete: 'CASCADE' })
  modelo!: Modelo;
}