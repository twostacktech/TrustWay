import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Veiculo } from "../../veiculo/entities/veiculo.entity";
import { Apolice } from "../../apolice/entities/apolice.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_usuarios'})
export class Usuario {

    @PrimaryColumn({length: 11, nullable: false})
    @IsNotEmpty()
    @ApiProperty()
    cpf!: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    nome!: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    tipo!: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    dataNascimento!: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    email!: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    senha!: string

    @IsNotEmpty()
    @Column({length: 11, nullable: false})
    @ApiProperty()
    numeroTelefone!: string;

    // relação com apolice - um usuário pode ter muitas apolices
    @ApiProperty()
    @OneToMany(() => Apolice, (apolice) => apolice.usuario, {
        onDelete: "CASCADE"
    })
    apolice!: Apolice[];
}