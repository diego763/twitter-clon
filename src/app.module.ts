import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuitsModule } from './module/tuits/tuits.module';

@Module({
  imports: [
    TuitsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '123456',
      database: 'postgres',
      autoLoadEntities: true, //se cargan los modelos automaticamente
      synchronize: true, // bueno en desarrollo, cualquier cambio aplicado en los modelos se aplica en la base de datos. En produccion quitar
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
