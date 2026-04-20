import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VeiculoService } from '../service/veiculo.service';
import { Veiculo } from '../entities/veiculo.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Veiculo')
@UseGuards(JwtAuthGuard)
@Controller('/veiculos')
@ApiBearerAuth()
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post() // Cadastrar veiculo
  @HttpCode(HttpStatus.CREATED)
  create(@Body() veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoService.create(veiculo);
  }

  @Get() // Buscar todos veiculos
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Veiculo[]> {
    return this.veiculoService.findAll();
  }

  @Get(':placa') // Buscar por placa
  @HttpCode(HttpStatus.OK)
  findByPlaca(@Param('placa') placa: string): Promise<Veiculo> {
    return this.veiculoService.findByPlaca(placa);
  }

  @Get('modelo/:modelo') // Buscar por modelo
  @HttpCode(HttpStatus.OK)
  findByModelo(@Param('modelo') modelo: string): Promise<Veiculo[]> {
    return this.veiculoService.findByModelo(modelo);
  }

  @Put(':placa') // Atualizar veiculo
  @HttpCode(HttpStatus.OK)
  update(@Body() veiculo: Veiculo): Promise<Veiculo> {
    return this.veiculoService.update(veiculo);
  }

  @Delete(':placa') // Deletar veiculo
  delete(@Param('placa') placa: string) {
    return this.veiculoService.delete(placa);
  }
}