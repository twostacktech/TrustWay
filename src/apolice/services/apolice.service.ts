import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { Repository } from "typeorm";


@Injectable()
export class ApoliceService {

  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>
  ) {}

  async findAll(): Promise<Apolice[]> {
    return await this.apoliceRepository.find({
        /*relations: { ----- relacionamento com cliente e veiculo ainda nao feito
        usuario: true,
        veiculo: true
      }*/

    });
  }

  async findById(id: number): Promise<Apolice> {
    const apolice = await this.apoliceRepository.findOne({
         where: { id },   
      /* relations: { --- relacionamento com cliente e veiculo ainda nao feito 
        usuario: true,
        veiculo: true
      }*/

    });

    if (!apolice) {
      throw new HttpException('Apólice não encontrada', HttpStatus.NOT_FOUND);
    }

    return apolice;
  }

  async create(apolice: Apolice): Promise<Apolice> {
    return await this.apoliceRepository.save(apolice);
  }

  async update(apolice: Apolice): Promise<Apolice> {
    await this.findById(apolice.id);
    return await this.apoliceRepository.save(apolice);
  }

  async delete(id: number): Promise<string> {
    await this.findById(id);
    await this.apoliceRepository.delete(id);
    
    return "Apólice deletada com sucesso";
  }
}