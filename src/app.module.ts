import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Veiculo } from './veiculo/entities/veiculo.entity';
import { ApoliceModule } from './apolice/apolice.module';
import { Apolice } from './apolice/entities/apolice.entity';
import { AuthModule } from './auth/auth.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ProdService } from './data/services/prod.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    VeiculoModule,
    UsuarioModule,
    ApoliceModule,
    AuthModule
  ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
