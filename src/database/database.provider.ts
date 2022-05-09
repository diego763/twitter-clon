import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from 'src/common/enum';
import { ConnectionOptions } from 'typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv =
      config.get<string>('NODE_ENV') !== Environment.Production;

    const dbConfig = {
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      autoLoadEntities: true, //se cargan los modelos automaticamente
      synchronize: isDevelopmentEnv, // bueno en desarrollo, cualquier cambio aplicado en los modelos se aplica en la base de datos. En produccion quitar
      logging: config.get<string>('DB_LOGGING'),
    } as ConnectionOptions;

    return dbConfig;
  },
});
