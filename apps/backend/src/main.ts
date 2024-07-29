/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: "*" })
    app.setGlobalPrefix("api")

    SwaggerModule.setup(
        "openApi",
        app,
        SwaggerModule.createDocument(
            app,
            new DocumentBuilder()
                .setTitle("API Docs")
                .setVersion("1.0")
                .addTag("api")
                .build()
        ),
        { useGlobalPrefix: true }
    )

    await app.listen(3000)
    Logger.log("🚀 Application is running on: http://localhost:3000/api")
}

bootstrap()
