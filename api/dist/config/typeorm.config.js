"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const typeorm_1 = require("typeorm");
const config = require("config");
const dbConfig = config.get('db');
exports.typeOrmConfig = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    logging: true,
    migrations: [__dirname + "../migrations/*{.ts,.js}"],
};
const connectionSource = new typeorm_1.DataSource(exports.typeOrmConfig);
exports.default = connectionSource;
//# sourceMappingURL=typeorm.config.js.map