import { Module } from "@nestjs/common"

import { DbModule } from "./db/db.module"
import { UsersModule } from "./users/users.module"
import { GamesModule } from "./games/games.module"
import { AuthModule } from "./auth/auth.module"

@Module({
    imports: [DbModule, UsersModule, GamesModule, AuthModule]
})
export class AppModule {}
