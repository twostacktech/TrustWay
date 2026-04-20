import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {

  @PrimaryColumn({ length: 7 })
  placa!: string;

  @Column({ length: 100 })
  marca!: string;

  @Column({ length: 100 })
  modelo!: string;

  @Column({ type: 'int' })
  ano!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  precoFip!: string;

  @ApiProperty({ type: () => Apolice })
  @OneToOne(() => Apolice, (apolice) => apolice.veiculo,{
        onDelete: "CASCADE"
  })
  apolice!: Apolice;
}