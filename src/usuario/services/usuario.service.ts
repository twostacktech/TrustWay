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
        return this.usuarioRepository.find();
    }
    
    async findByCpf(cpf: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { cpf }
        });

        if (!usuario)
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findAllByNome(nome: string): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async create(usuario: Usuario): Promise<Usuario> {
        const buscaUsuario = await this.findByCpf(usuario.cpf);

        if (buscaUsuario)
            throw new HttpException("O Usuario já existe", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findByCpf(usuario.cpf);

        const buscaUsuario = await this.findAllByNome(usuario.nome);

        if (buscaUsuario.length > 0)
            throw new HttpException("O Usuario já existe", HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return this.usuarioRepository.save(usuario);

    }

    async delete(cpf: string): Promise<void> {
        const usuario = await this.findByCpf(cpf);

        await this.usuarioRepository.remove(usuario);
    }
}