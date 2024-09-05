import { TypeOrmModule } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModule = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'ballball',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}