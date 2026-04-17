import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceController } from "./controllers/apolice.controller";
import { ApoliceService } from "./services/apolice.service";


@Module({
  imports: [TypeOrmModule.forFeature([Apolice])],
  controllers: [ApoliceController],
  providers: [ApoliceService],
  exports: [ApoliceService],
})
export class ApoliceModule {}