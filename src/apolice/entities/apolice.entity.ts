import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";


@Entity({ name: "tb_apolice" })
export class Apolice {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ type: 'date' })
    dataInicio!: Date;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    mensalidade!: number;

    @IsNotEmpty()
    @Column({ length: 50 })
    status!: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    percentualCobertura!: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorFranquia!: number;

    // relação com usuário - muitos apolices para um usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'cpf_cliente' })
    usuario!: Usuario;

    // relação com veículo - uma apolice para um veículo
    @OneToOne(() => Veiculo, (veiculo) => veiculo.apolice, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'placa_veiculo' })
    veiculo!: Veiculo; 
}