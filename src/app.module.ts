import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApoliceModule } from './apolice/apolice.module';
import { Apolice } from './apolice/entities/apolice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_trustway',
      entities: [Apolice],
      synchronize: true,
    }),
    ApoliceModule,


  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
