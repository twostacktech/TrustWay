import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tb_apolice" })
export class Apolice {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({ type: 'date' })
    data_inicio!: Date;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    mensalidade!: number;

    @IsNotEmpty()
    @Column({ length: 50 })
    status!: string;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    percentual_cobertura!: number;

    @IsNotEmpty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valor_franquia!: number;


    /*relação com cliente

    @ManyToOne(() => Usuario, (usuario) => usuario.apolices, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'cpf_cliente' })
    usuario!: Usuario;

    // relação com veículo

    @ManyToOne(() => Veiculo, (veiculo) => veiculo.apolices, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'placa_veiculo' })
    veiculo!: Veiculo; */

}