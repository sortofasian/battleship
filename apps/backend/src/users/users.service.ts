import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"

import { DbService } from "../db/db.service"

@Injectable()
export class UsersService {
    constructor(private db: DbService) {}

    async search(query: string): Promise<User[]> {
        // Return a list of users by partial username
    }

    async read(id: string): Promise<User> {
        // Return one user by id
    }
}
