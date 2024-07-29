import { Global, Module } from "@nestjs/common"
import { APP_FILTER } from "@nestjs/core"

import { DbFilter } from "./db.filter"
import { DbService } from "./db.service"

@Global()
@Module({
    providers: [
        DbService,
        {
            provide: APP_FILTER,
            useClass: DbFilter
        }
    ],
    exports: [DbService]
})
export class DbModule {}
