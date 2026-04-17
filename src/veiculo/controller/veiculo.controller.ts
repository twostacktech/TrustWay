import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VeiculoService } from '../service/veiculo.service';

@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post() // Cadastrar veiculo
  criar(@Body() dados: any) {
    return this.veiculoService.criar(dados);
  }

  @Get() // Buscar todos veiculos
  listar() {
    return this.veiculoService.listarTodos();
  }

  @Get(':placa') // Buscar por placa
  buscarPorPlaca(@Param('placa') placa: string) {
    return this.veiculoService.buscarPorPlaca(placa);
  }

  @Get('modelo/:modelo') // Buscar por modelo
  buscarPorModelo(@Param('modelo') modelo: string) {
    return this.veiculoService.buscarPorModelo(modelo);
  }

  @Put(':placa') // Atualizar veiculo
  atualizar(@Param('placa') placa: string, @Body() dados: any) {
    return this.veiculoService.atualizar(placa, dados);
  }

  @Delete(':placa') // Deletar veiculo
  remover(@Param('placa') placa: string) {
    return this.veiculoService.remover(placa);
  }
}