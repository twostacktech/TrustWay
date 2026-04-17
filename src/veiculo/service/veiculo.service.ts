import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepo: Repository<Veiculo>,
  ) {}

  async criar(dados: any) {
    // salva tudo direto na tb_veiculos
    const novoVeiculo = this.veiculoRepo.create(dados);
    return await this.veiculoRepo.save(novoVeiculo);
  }

  async listar() {
    return await this.veiculoRepo.find();
  }
}