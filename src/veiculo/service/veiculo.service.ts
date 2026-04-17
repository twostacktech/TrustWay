import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';
import { Marca } from '../entities/marca.entity';
import { Modelo } from '../entities/modelo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo) private veiculoRepo: Repository<Veiculo>,
    @InjectRepository(Marca) private marcaRepo: Repository<Marca>,
    @InjectRepository(Modelo) private modeloRepo: Repository<Modelo>,
  ) {}

  async criarTudo(dados: any) {
    // 1. procura ou cria a marca (ex: honda)
    let marca = await this.marcaRepo.findOneBy({ nome: dados.marca });
    if (!marca) {
      marca = await this.marcaRepo.save(this.marcaRepo.create({ nome: dados.marca }));
    }

    // 2. procura ou cria o modelo vinculado da marca (ex: city)
    let modelo = await this.modeloRepo.findOneBy({ nome: dados.modelo, marca: { id: marca.id } });
    if (!modelo) {
      modelo = await this.modeloRepo.save(this.modeloRepo.create({ nome: dados.modelo, marca }));
    }

    // 3. salva o veículo com os nomes exatos
    const novoVeiculo = this.veiculoRepo.create({
      placa: dados.placa,
      ano: dados.ano,
      precoFip: dados.precoFip,
      modelo: modelo
    });

    return await this.veiculoRepo.save(novoVeiculo);
  }

  async listar() {
    return await this.veiculoRepo.find({ relations: ['modelo', 'modelo.marca'] });
  }
}