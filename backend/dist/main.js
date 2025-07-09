"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const data_source_1 = require("./data-source");
async function runMigrations() {
    try {
        if (!data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.initialize();
        }
        await data_source_1.AppDataSource.runMigrations();
        console.log('✅ Migrations exécutées avec succès');
    }
    catch (error) {
        console.error('Erreur lors de l\'exécution des migrations :', error);
    }
}
async function bootstrap() {
    await runMigrations();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('School Management API')
        .setDescription('Multi-school management system API')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey({ type: 'apiKey', name: 'x-school-id', in: 'header' }, 'school-id')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 School Management API is running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map