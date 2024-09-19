import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import * as config from 'config';
import { registerAs } from "@nestjs/config";

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModule = {
    type: dbConfig.type,
    host:  dbConfig.host,
    port:  dbConfig.port,
    username:  dbConfig.username,
    password:  dbConfig.password,
    database:   dbConfig.database,
    //entities: ["dist/**/*.entity{.ts,.js}"],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    //migrations: ["dist/migrations/*{.ts,.js}"],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    //synchronize: false
}

export default registerAs('typeorm', () => typeOrmConfig)
export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions);