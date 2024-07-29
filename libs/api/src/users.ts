export class UserResponseDto {
    constructor(
        public id: string,
        public username: string
    ) {}
}

export interface IUsers {
    // users/:id
    // GET
    get(id: string): Promise<UserResponseDto>

    // GET
    search(id: string): Promise<UserResponseDto[]>
}
