import { LoginRequestDto } from "@hs-intern/api"
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"

import { Public } from "./auth.decorator"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() login: LoginRequestDto) {
        return this.authService.login(login.username, login.password)
    }
}
