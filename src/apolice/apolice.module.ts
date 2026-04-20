import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceController } from "./controllers/apolice.controller";
import { ApoliceService } from "./services/apolice.service";
import { UsuarioModule } from '../usuario/usuario.module';
import { VeiculoModule } from '../veiculo/veiculo.module';


@Module({
  imports: [TypeOrmModule.forFeature([Apolice]),
  UsuarioModule,
  VeiculoModule
  ],
  controllers: [ApoliceController],
  providers: [ApoliceService],
  exports: [ApoliceService],
})
export class ApoliceModule {}