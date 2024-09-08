"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = exports.typeOrmConfig = void 0;
const typeorm_1 = require("typeorm");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'ballball',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
};
exports.connectionSource = new typeorm_1.DataSource(exports.typeOrmConfig);
//# sourceMappingURL=typeorm.config.js.map