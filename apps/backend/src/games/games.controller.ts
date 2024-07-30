import { GameCreateDto, GameSetupDto } from "@hs-intern/api"
import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { User } from "@prisma/client"

import { AuthedUser } from "../auth/auth.decorator"
import { GamesService } from "./games.service"

@Controller("games")
export class GamesController {
    constructor(private games: GamesService) {}

    @Post("create")
    async new(
        @AuthedUser() user: User,
        @Body() { enemyUserId }: GameCreateDto
    ) {
        const game = await this.games.create(user.id, enemyUserId)
        return this.games.gameToUserView(game, user.id)
    }

    @Post(":id/setup")
    async setup(
        @AuthedUser() { id: userid }: User,
        @Param("id") id: string,
        @Body() { ships }: GameSetupDto
    ) {
        await this.games.setup(id, userid, ships)
    }

    @Get(":id/setup")
    async awaitSetup(@Param("id") id: string) {
        await this.games.awaitSetup(id)
    }
}
