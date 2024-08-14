import { UserResponseDto } from "@hs-intern/api"
import { Controller, Get, Param, Query } from "@nestjs/common"

import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @Get(":id")
    async read(@Param("id") id: string): Promise<UserResponseDto> {
        // Return user as DTO to client
        const user = await this.users.read(id)
        return new UserResponseDto(user.id,user.username)
    }

    @Get("search")
    async search(
        @Query("username") username: string
    ): Promise<UserResponseDto[]> {
        // Return list of users as DTO to client
        const users = await this.users.search(username)
        const dtos = []
        for(let i = 0; i < users.length; i++) {
            const user = users[i]
            dtos.push(new UserResponseDto(user.id, user.username))
        }
        return dtos
    }     
}
