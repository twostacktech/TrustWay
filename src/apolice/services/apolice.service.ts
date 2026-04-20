import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Apolice } from "../entities/apolice.entity";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { VeiculoService } from "../../veiculo/service/veiculo.service";

@Injectable()
export class ApoliceService {

  constructor(
    @InjectRepository(Apolice)
    private apoliceRepository: Repository<Apolice>,

    private usuarioService: UsuarioService,
    private veiculoService: VeiculoService
  ) {}

  // -------------------------
  // REGRA DE NEGÓCIO
  // -------------------------

  aplicarDescontoVeiculoAntigo(apolice: Apolice): Apolice {

    const anoAtual = new Date().getFullYear();
    const idadeVeiculo = anoAtual - apolice.veiculo.ano;

    // Mais de 10 anos = 20% desconto
    if (idadeVeiculo > 10) {
      apolice.mensalidade = apolice.mensalidade * 0.8;
    }

    return apolice;
  }


  // -------------------------
  // FIND ALL
  // -------------------------

  async findAll(): Promise<Apolice[]> {

    const apolices = await this.apoliceRepository.find({
      relations: {
        usuario: true,
        veiculo: true
      }
    });

    return apolices.map(apolice =>
      this.aplicarDescontoVeiculoAntigo(apolice)
    );
  }


  // -------------------------
  // FIND BY ID
  // -------------------------

  async findById(id: number): Promise<Apolice> {

    const apolice = await this.apoliceRepository.findOne({
      where: { id },
      relations: {
        usuario: true,
        veiculo: true
      }
    });

    if (!apolice) {
      throw new HttpException(
        'Apólice não encontrada',
        HttpStatus.NOT_FOUND
      );
    }

    return this.aplicarDescontoVeiculoAntigo(apolice);
  }


  // -------------------------
  // FIND BY CPF
  // -------------------------

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

    return apolices.map(apolice =>
      this.aplicarDescontoVeiculoAntigo(apolice)
    );
  }


  // -------------------------
  // CREATE
  // -------------------------

  async create(apolice: Apolice): Promise<Apolice> {

    if (!apolice.usuario) {
      throw new HttpException(
        'CPF do cliente nao pode ser nulo!',
        HttpStatus.BAD_REQUEST
      );
    }

    await this.usuarioService.findByCpf(
      apolice.usuario.cpf
    );
    if (!apolice.veiculo) {
      throw new HttpException(
        'A placa do veículo nao pode ser nula!',
        HttpStatus.BAD_REQUEST
      );
    }

    await this.veiculoService.findByPlaca(
      apolice.veiculo.placa
    );
    return await this.apoliceRepository.save(apolice);
  }
  // -------------------------
  // UPDATE
  // -------------------------
  async update(apolice: Apolice): Promise<Apolice> {

    const buscaApolice = await this.findById(apolice.id);

    if (!buscaApolice || !apolice.id) {
      throw new HttpException(
        'Apólice não encontrada!',
        HttpStatus.NOT_FOUND
      );
    }

    if (!apolice.usuario) {
      throw new HttpException(
        'O CPF do cliente nao pode ser nulo!',
        HttpStatus.BAD_REQUEST
      );
    }

    await this.usuarioService.findByCpf(
      apolice.usuario.cpf
    );

    if (!apolice.veiculo) {
      throw new HttpException(
        'A placa do veículo nao pode ser nula!',
        HttpStatus.BAD_REQUEST
      );
    }

    await this.veiculoService.findByPlaca(
      apolice.veiculo.placa
    );

    return await this.apoliceRepository.save(apolice);
  }
  // -------------------------
  // DELETE
  // -------------------------
  async delete(id: number): Promise<string> {
    await this.findById(id);
    await this.apoliceRepository.delete(id);
    return "Apólice deletada com sucesso";
  }
}