import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const typeOrmConfig: TypeOrmModule = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'ballball',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    //synchronize: false
}

//export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions);