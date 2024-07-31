import { LoginClaimDto } from "@hs-intern/api"
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { IncomingMessage } from "http"

import { DbService } from "../db/db.service"
import { IS_PUBLIC_KEY } from "./auth.decorator"
import { SECRET } from "./token"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwt: JwtService,
        private db: DbService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (isPublic) return true

        const request = context.switchToHttp().getRequest<IncomingMessage>()
        // if not authorized throw new UnauthorizedException()
        const token = this.extractToken(request)
        if (!token) throw new UnauthorizedException()

        try {
            const { id } = await this.jwt.verifyAsync<LoginClaimDto>(token, {
                secret: SECRET
            })
            const user = await this.db.user.findUniqueOrThrow({ where: { id } })
            request["user"] = user
        } catch {
            throw new UnauthorizedException()
        }
        return true
    }

    extractToken(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? []
        return type === "Bearer" ? token : undefined
    }
}
