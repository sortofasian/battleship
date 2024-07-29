import { Module } from "@nestjs/common"

import { DbModule } from "./db/db.module"
import { UsersModule } from "./users/users.module"

@Module({
    imports: [DbModule, UsersModule]
})
export class AppModule {}
