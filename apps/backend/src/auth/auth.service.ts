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
       const User = await this.db.user.findUnique(
            {
                where:{ username: username}
            }
        )
            if (User.password == password) {
                const Dto: LoginClaimDto = {id: User.id}
               const token = await this.jwt.signAsync(Dto)
                const Res = new LoginResponseDto(token)
                return Res
            }
    }
}
