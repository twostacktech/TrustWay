import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoController } from '../controller/veiculo.controller';
import { VeiculoService } from '../service/veiculo.service';
import { Veiculo } from '../entities/veiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Veiculo]) // Apenas Veiculo aqui
  ],
  controllers: [VeiculoController],
  providers: [VeiculoService],
})
export class VeiculoModule {}