import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'tb_usuarios'})
export class Usuario {

    @PrimaryColumn({length: 11, nullable: false})
    @IsNotEmpty()
    cpf!: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome!: string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    tipo!: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    dataNascimento!: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    email!: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    senha!: string

    @IsNotEmpty()
    @Column({length: 11, nullable: false})
    numeroTelefone!: string;
}