import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Veiculo } from '../entities/veiculo.entity';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepo: Repository<Veiculo>,
  ) {}

  // POST: Cadastrar veiculo
  async create(veiculo: Veiculo): Promise<Veiculo> {
    return await this.veiculoRepo.save(veiculo);
  }

  // GET: Buscar todos veiculos
  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepo.find({
      relations: {
        apolice: true
      }
    });
  }

  // GET: Buscar por placa
  async findByPlaca(placa: string): Promise<Veiculo> {
    const veiculo = await this.veiculoRepo.findOne({ 
      where:{ placa 
      },
      relations: {
        apolice: true
      }
    });

    if (!veiculo) 
      throw new NotFoundException('Veículo não encontrado');
    return veiculo;
  }

  // GET: Buscar por modelo
  async findByModelo(modelo: string): Promise<Veiculo[]> {
    return await this.veiculoRepo.find({
      where: { 
        modelo: ILike(`%${modelo}%`) 
      }, // Busca aproximada (ex: busca "Cit" e acha "City")
      relations:{
        apolice: true
      }
    });
  }

  // PUT: Atualizar veiculo
  async update(veiculo: Veiculo): Promise<Veiculo> {
    //verificar se Veiculo existe
    let buscaVeiculo: Veiculo = await this.findByPlaca(veiculo.placa);
    if (!buscaVeiculo)
      throw new HttpException('Veículo não encontrado!', HttpStatus.NOT_FOUND);

    return await this.veiculoRepo.save(veiculo);
  }

  // DEL: Deletar veiculo
  async delete(placa: string): Promise<DeleteResult> {
    await this.findByPlaca(placa);
    return await this.veiculoRepo.delete(placa);
  }
}