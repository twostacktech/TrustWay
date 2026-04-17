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

    //verificar se a apolice existe
    let buscaApolice: Apolice = await this.findById(apolice.id);
    if (!buscaApolice || !apolice.id)
      throw new HttpException('Apólice não encontrada!', HttpStatus.NOT_FOUND);
    
    //--------------sem relacionamento-------------------//
    return await this.apoliceRepository.save(apolice);

    //--------------com relacionamento-------------------//
    
    //se a apolice existe, verificar se o cpf do usuario esta nulo
    // if (apolice.cpfUsuario){

    //   //verificar se o cpf do usuario existe
    //   let cpfUsuario = await this.usuarioService.findById(apolice.cpfUsuario) 
    //   if (!cpfUsuario)
    //     throw new HttpException('CPF do usuário não encontrado!', HttpStatus.NOT_FOUND);

    //   //se apolice e cpf do usuario existem, verifica se a placa do veiculo esta nula
    //   if (apolice.placaVeiculo){

    //     //verificar se a placa do veiculo existe
    //     let placaVeiculo = await this.veiculoService.findById(apolice.placaVeiculo) 
    //     if (!placaVeiculo)
    //       throw new HttpException('Placa do veículo não encontrada!', HttpStatus.NOT_FOUND);

    //     //se tudo existe, atualizar a apolice
    //     return await this.apoliceRepository.save(apolice);

    //   }else{
    //     throw new HttpException('A placa do veículo nao pode ser nula!', HttpStatus.NOT_FOUND);
    //   }

    // }else{
    //   throw new HttpException('O CPF do cliente nao pode ser nulo!', HttpStatus.NOT_FOUND);
    // }

  }

  async delete(id: number): Promise<string> {
    await this.findById(id);
    await this.apoliceRepository.delete(id);
    
    return "Apólice deletada com sucesso";
  }
}