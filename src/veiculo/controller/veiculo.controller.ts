import { Body, Controller, Get, Post } from '@nestjs/common';
import { VeiculoService } from '../service/veiculo.service';

@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  async criar(@Body() dados: any) {
    return await this.veiculoService.criar(dados);
  }

  @Get()
  listar() {
    return this.veiculoService.listar();
  }
}