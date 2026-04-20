import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('usuario')
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':cpf')
    @HttpCode(HttpStatus.OK)
    findByCpf(@Param('cpf') cpf: string): Promise<Usuario> {
        return this.usuarioService.findByCpf(cpf);
    }

    @UseGuards(JwtAuthGuard)
    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<Usuario[]> {
        return this.usuarioService.findAllByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':cpf')
    @HttpCode(HttpStatus.OK)
    update(@Param('cpf') cpf: string, @Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':cpf')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('cpf') cpf: string): Promise<void> {
        return this.usuarioService.delete(cpf);
    }
}