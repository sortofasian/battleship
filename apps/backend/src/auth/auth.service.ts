import { LoginClaimDto, LoginResponseDto } from "@hs-intern/api"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { DbService } from "../db/db.service"

@Injectable()
export class AuthService {
    constructor(
        private db: DbService,
        private jwt: JwtService
    ) {}

    async login(username: string, password: string) {
        // Check if password is correct for the user
        // Generate a LoginClaimDto and sign it with this.jwt.signAsync
        // Then, return a LoginResponseDto with the resulting signed token
    }
}
