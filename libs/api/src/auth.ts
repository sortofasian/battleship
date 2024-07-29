export class LoginRequestDto {
    constructor(
        public username: string,
        public password: string
    ) {}
}

export class LoginResponseDto {
    constructor(public token: string) {}
}

export type LoginClaimDto = {
    id: string
}

export interface IAuth {
    // POST
    login(req: LoginRequestDto): Promise<LoginResponseDto>
}
