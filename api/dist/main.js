"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config = require("config");
async function bootstrap() {
    const serverConfig = config.get('server');
    const dbConfig = config.get('db');
    console.log('dbConfig', dbConfig);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const port = process.env.port || serverConfig.port;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map