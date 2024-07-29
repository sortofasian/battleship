import { Action, Coordinate, Ship } from "@prisma/client"

export class GameCreateDto {
    constructor(public enemyUserId: string) {}
}

export class GameSetupDto {
    constructor(public ships: Ship[]) {}
}

export class GameActDto {
    constructor(public target: Coordinate) {}
}

export class GameResponseDto {
    constructor(
        public id: string,
        public winnerId: string | undefined,
        public started: undefined | Date,
        public state: GameState,
        public enemyId: string,
        public ships: Ship[],
        public actionsUser: Action[],
        public actionsEnemy: Action[]
    ) {}
}

export enum GameState {
    Plan,
    Attack,
    Defend
}

export interface IGames {
    // GET
    games(userId?: string): Promise<GameResponseDto[]>

    // GET
    pending(): Promise<GameResponseDto[]>

    // POST
    create(req: GameCreateDto): Promise<void>

    // games/:id
    // GET
    get(id: string): Promise<GameResponseDto>

    // POST
    setup(id: string, req: GameSetupDto): Promise<void>

    // POST
    start(id: string): Promise<void>

    // POST
    actPost(id: string, req: GameActDto): Promise<void>

    // GET
    actGet(id: string): Promise<Action>
}
