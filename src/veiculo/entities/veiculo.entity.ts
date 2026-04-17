import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {
  @PrimaryColumn({ length: 7 })
  placa!: string;

  @Column({ length: 100, nullable: false })
  marca!: string;

  @Column({ length: 100, nullable: false })
  modelo!: string;

  @Column({ type: 'int', nullable: false })
  ano!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  precoFip!: number;
}