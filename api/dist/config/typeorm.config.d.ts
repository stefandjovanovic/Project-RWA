import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
export declare const typeOrmConfig: TypeOrmModule;
declare const _default: (() => TypeOrmModule) & import("@nestjs/config").ConfigFactoryKeyHost<TypeOrmModule>;
export default _default;
export declare const connectionSource: DataSource;
