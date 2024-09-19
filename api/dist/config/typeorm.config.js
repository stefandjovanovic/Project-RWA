"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.typeOrmConfig = void 0;
const typeorm_1 = require("typeorm");
const config = require("config");
const config_1 = require("@nestjs/config");
const dbConfig = config.get('db');
exports.typeOrmConfig = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
};
exports.default = (0, config_1.registerAs)('typeorm', () => exports.typeOrmConfig);
exports.connectionSource = new typeorm_1.DataSource(exports.typeOrmConfig);
//# sourceMappingURL=typeorm.config.js.map