import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoModule } from './veiculo/module/veiculo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Veiculo } from './veiculo/entities/veiculo.entity';
import { ApoliceModule } from './apolice/apolice.module';
import { Apolice } from './apolice/entities/apolice.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_trustway',
      entities: [Usuario, Veiculo, Apolice],
      synchronize: true,
    }),
    VeiculoModule,
    UsuarioModule,
    ApoliceModule,
    AuthModule
  ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
