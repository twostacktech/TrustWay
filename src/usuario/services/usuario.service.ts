import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
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
        return this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {
        await this.findByCpf(usuario.cpf);
        return this.usuarioRepository.save(usuario);
    }

    async delete(cpf: string): Promise<void> {
        const usuario = await this.findByCpf(cpf);

        await this.usuarioRepository.remove(usuario);
    }
}