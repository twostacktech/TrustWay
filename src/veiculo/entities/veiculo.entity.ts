import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

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

  @ManyToOne(() => Usuario, (usuario) => usuario.veiculos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_cpf' })
  usuario!: Usuario;
    apolices: any;
}