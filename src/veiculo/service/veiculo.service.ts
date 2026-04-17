import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepo: Repository<Veiculo>,
  ) {}

  // POST: Cadastrar veiculo
  async criar(dados: any) {
    const novoVeiculo = this.veiculoRepo.create(dados);
    return await this.veiculoRepo.save(novoVeiculo);
  }

  // GET: Buscar todos veiculos
  async listarTodos() {
    return await this.veiculoRepo.find();
  }

  // GET: Buscar por placa
  async buscarPorPlaca(placa: string) {
    const veiculo = await this.veiculoRepo.findOneBy({ placa });
    if (!veiculo) throw new NotFoundException('Veículo não encontrado');
    return veiculo;
  }

  // GET: Buscar por modelo
  async buscarPorModelo(modelo: string) {
    return await this.veiculoRepo.find({
      where: { modelo: ILike(`%${modelo}%`) }, // Busca aproximada (ex: busca "Cit" e acha "City")
    });
  }

  // PUT: Atualizar veiculo
  async atualizar(placa: string, dados: any) {
    await this.buscarPorPlaca(placa); // Garante que existe antes de atualizar
    await this.veiculoRepo.update(placa, dados);
    return await this.buscarPorPlaca(placa);
  }

  // DEL: Deletar veiculo
  async remover(placa: string) {
    const veiculo = await this.buscarPorPlaca(placa);
    await this.veiculoRepo.remove(veiculo);
    return { message: 'Veículo removido com sucesso' };
  }
}