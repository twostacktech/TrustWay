import { IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "tb_apolice" })
export class Apolice {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number;

    @IsNotEmpty()
    @Column({ type: 'date' })
    @ApiProperty()
    dataInicio!: Date;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty()
    mensalidade!: number;

    @IsNotEmpty()
    @Column({ length: 50 })
    @ApiProperty()
    status!: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    @ApiProperty()
    percentualCobertura!: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty()
    valorFranquia!: number;

    // relação com usuário - muitos apolices para um usuario
    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'cpf_cliente' })
    usuario!: Usuario;

    // relação com veículo - uma apolice para um veículo
    @ApiProperty({ type: () => Veiculo })
    @OneToOne(() => Veiculo, (veiculo) => veiculo.apolice, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'placa_veiculo' })
    veiculo!: Veiculo; 
}