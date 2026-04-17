import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoController } from '../controller/veiculo.controller';
import { VeiculoService } from '../service/veiculo.service';
import { Veiculo } from '../entities/veiculo.entity';
import { Modelo } from '../entities/modelo.entity';
import { Marca } from '../entities/marca.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Veiculo, Modelo, Marca])
  ],
  controllers: [VeiculoController],
  providers: [VeiculoService],
})
export class VeiculoModule {}