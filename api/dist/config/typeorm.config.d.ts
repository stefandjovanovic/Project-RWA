import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
export declare const typeOrmConfig: TypeOrmModule;
declare const connectionSource: DataSource;
export default connectionSource;
