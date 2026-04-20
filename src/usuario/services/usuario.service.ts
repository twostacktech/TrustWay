import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: {
                apolice: true
            }
        });
    }
    
    async findByCpf(cpf: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
        where: { 
            cpf 
        },
        relations: {
            apolice: true
        }
    });

    if (!usuario)
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    usuario.senha = undefined as any;

    return usuario;
}

    async findAllByNome(nome: string): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                apolice: true
            }
        });
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                email: email
            },
            relations: {
                apolice: true
            }
        });
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const buscaUsuario = await this.findByEmail(usuario.email);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findByCpf(usuario.cpf);
        const buscaUsuario = await this.findByEmail(usuario.email);
        if (buscaUsuario && buscaUsuario.cpf !== usuario.cpf)
            throw new HttpException("O Usuario já existe", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
        return this.usuarioRepository.save(usuario);
    }

    async delete(cpf: string): Promise<void> {
        const usuario = await this.findByCpf(cpf);

        await this.usuarioRepository.remove(usuario);
    }
}