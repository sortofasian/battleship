import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"

import { DbService } from "../db/db.service"
import {DbModule} from "../db/db.module"
import {startWith} from "rxjs"

@Injectable()
export class UsersService {
    constructor(private db: DbService) {}

    async search(query: string): Promise<User[]> {
        // Return a list of users by partial username
        return this.db.user.findMany(
            {
                where: {
                    username: {
                        startsWith: query
                    }
                }
            }
        )
    }
    async read(id: string): Promise<User> {
        // Return one user by id
        return this.db.user.findUnique({
            where: {
                id
            }
        })
    }
}