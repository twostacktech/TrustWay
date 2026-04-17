import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_veiculos' })
export class Veiculo {
  @PrimaryColumn({ length: 7 })
  placa!: string; // Chave Primária (PK)

  @Column({ length: 100, nullable: false })
  marca!: string;

  @Column({ length: 100, nullable: false })
  modelo!: string;

  @Column({ type: 'int', nullable: false })
  ano!: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  precoFip!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.veiculos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_cpf' }) // FK no banco
  usuario!: Usuario;
    apolices: any;


}