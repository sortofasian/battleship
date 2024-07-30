import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"

import { AuthController } from "./auth.controller"
import { AuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { SECRET } from "./token"

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: SECRET, // TODO: config module
            signOptions: { expiresIn: "30m" }
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AuthModule {}
