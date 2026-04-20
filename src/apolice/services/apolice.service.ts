import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { Repository } from "typeorm";
import { VeiculoService } from "../../veiculo/service/veiculo.service";
import { UsuarioService } from "../../usuario/services/usuario.service";

@Injectable()
export class ApoliceService {

  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,
    private usuarioService: UsuarioService,
    private veiculoService: VeiculoService
  ) {}

  async findAll(): Promise<Apolice[]> {
    return await this.apoliceRepository.find({
      relations: { 
        usuario: true,
        veiculo: true
      }

    });
  }

  async findById(id: number): Promise<Apolice> {
    const apolice = await this.apoliceRepository.findOne({
      where: { 
        id 
      },   
      relations: { 
        usuario: true,
        veiculo: true
      }

    });

    if (!apolice) {
      throw new HttpException('Apólice não encontrada', HttpStatus.NOT_FOUND);
    }
    return apolice;
  }

  //find by cpf do cliente
  async findByCpf(cpf: string): Promise<Apolice[]> {
    const apolices = await this.apoliceRepository.find({
      where: { 
        usuario: { cpf } 
      },
      relations: { 
        usuario: true,
        veiculo: true
      }
    });
    return apolices;
  }

  async create(apolice: Apolice): Promise<Apolice> {

    if (!apolice.veiculo) {
    throw new HttpException(
        'Veículo não informado',
        HttpStatus.BAD_REQUEST
      );
    }

    const veiculo = await this.veiculoService.findByPlaca(
      apolice.veiculo.placa
    );

    const anoAtual = new Date().getFullYear();
    const idadeVeiculo = anoAtual - veiculo.ano;

    // aplica desconto na mensalidade já existente
    if (idadeVeiculo > 10) {
      apolice.mensalidade = apolice.mensalidade * 0.8;
    }

    return await this.apoliceRepository.save(apolice);
  }

  async update(apolice: Apolice): Promise<Apolice> {

    //verificar se a apolice existe
    let buscaApolice: Apolice = await this.findById(apolice.id);
    if (!buscaApolice || !apolice.id)
      throw new HttpException('Apólice não encontrada!', HttpStatus.NOT_FOUND);
    
    //se a apolice existe, verificar se o cpf do usuario esta nulo
    if (apolice.usuario){

       //verificar se o cpf do usuario existe
       let cpfUsuario = await this.usuarioService.findByCpf(apolice.usuario.cpf) 
       if (!cpfUsuario)
         throw new HttpException('CPF do usuário não encontrado!', HttpStatus.NOT_FOUND);

       //se apolice e cpf do usuario existem, verifica se a placa do veiculo esta nula
       if (apolice.veiculo){

         //verificar se a placa do veiculo existe
         let placaVeiculo = await this.veiculoService.findByPlaca(apolice.veiculo.placa) 
         if (!placaVeiculo)
           throw new HttpException('Placa do veículo não encontrada!', HttpStatus.NOT_FOUND);

         //se tudo existe, atualizar a apolice
         return await this.apoliceRepository.save(apolice);

       }else{
         throw new HttpException('A placa do veículo nao pode ser nula!', HttpStatus.NOT_FOUND);
       }

     }else{
       throw new HttpException('O CPF do cliente nao pode ser nulo!', HttpStatus.NOT_FOUND);
     }

  }

  async delete(id: number): Promise<string> {
    await this.findById(id);
    await this.apoliceRepository.delete(id);
    
    return "Apólice deletada com sucesso";
  }
}