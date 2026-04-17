import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(veiculo: Veiculo) {
    return await this.veiculoRepo.save(veiculo);
  }

  // GET: Buscar todos veiculos
  async findAll() {
    return await this.veiculoRepo.find();
  }

  // GET: Buscar por placa
  async findByPlaca(placa: string) {
    const veiculo = await this.veiculoRepo.findOneBy({ placa });
    if (!veiculo) 
      throw new NotFoundException('Veículo não encontrado');
    return veiculo;
  }

  // GET: Buscar por modelo
  async findByModelo(modelo: string) {
    return await this.veiculoRepo.find({
      where: { modelo: ILike(`%${modelo}%`) }, // Busca aproximada (ex: busca "Cit" e acha "City")
    });
  }

  // PUT: Atualizar veiculo
  async update(veiculo: Veiculo) {
    //verificar se Veiculo existe
    let buscaVeiculo: Veiculo = await this.findByPlaca(veiculo.placa);
    if (!buscaVeiculo)
      throw new HttpException('Veículo não encontrado!', HttpStatus.NOT_FOUND);

    return await this.veiculoRepo.save(veiculo);
  }

  // DEL: Deletar veiculo
  async delete(placa: string) {
    const veiculo = await this.findByPlaca(placa);
    await this.veiculoRepo.delete(veiculo);
    return { message: 'Veículo removido com sucesso' };
  }
}