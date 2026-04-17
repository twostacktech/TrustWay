import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoModule } from './veiculo/module/veiculo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_trustway',
      entities: [],
      synchronize: true,
    }),
    VeiculoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
