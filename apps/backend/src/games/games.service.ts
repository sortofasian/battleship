import { GameState } from "@hs-intern/api"
import { Injectable } from "@nestjs/common"
import { Action, Coordinate, Game, Ship, User } from "@prisma/client"

import { DbService } from "../db/db.service"

type UserView = {
    id: string
    winnerId: string
    started: Date | undefined
    state: GameState

    userId: string
    userShips: Ship[]
    userActions: Action[]

    enemyId: string
    enemyShips: Ship[]
    enemyActions: Action[]
}

@Injectable()
export class GamesService {
    constructor(private db: DbService) {}

    async create(id: string, enemyUserId: string): Promise<Game> {
        // create and retur a new game given the user id and enemy id
        const game: Game = await this.db.game.create({
            data: {
                actionsChallenged: [],
                actionsChallenger: [],
                shipsChallenged: [],
                shipsChallenger: [],
                started: new Date(),
                userIdChallenged: id,
                userIdChallenger: enemyUserId
            }
        })

        return game
    }

    // Array of functions that compare an id and return whether they triggered and should be removed
    private setupListeners: ((gameId: string) => boolean)[] = []

    async setup(id: string, userId: string, ships: Ship[]) {
        // Find a game by id, convert to what the user sees
        // Handle games that are already started
        // Set ships of the user view to new ships
        // Convert view back to game object
        // Update a game
        // Filter the listeners by running them with the game id and removing ones that return true

        let game: Game = await this.db.game.findUnique({
            where: { id }
        })

        if (game.started) {
            throw new Error("Game Already Started")
        }

        const user: User = await this.db.user.findUnique({
            where: { id: userId }
        })

        const view: UserView = this.gameToUserView(game, userId)

        view.userShips = ships

        game = this.userViewToGame(view, game)

        this.db.game.update({
            where: {
                id: game.id
            },
            data: {
                ...game
            }
        })

        this.setupListeners.filter((x) => x(id))
    }

    async awaitSetup(waitingId: string) {
        // create a function that compares id to an id passed to the function
        // push the function to this.setupListeners
        this.setupListeners.push((id) => id === waitingId)
    }

    private actionListeners: ((gameId: string) => boolean)[] = []

    async waitForAction(id: string) {}

    async act(id: string, userId: string, target: Coordinate) {
        const game = await this.db.game.findUniqueOrThrow({ where: { id } })
        const userView = this.gameToUserView(game, userId)

        // check whether action hit a ship, for every ship in enemy ships
        // add action to useractions

        // check whether every enemy ship was hit by user actions
        // If true, set the winnerId to the user

        // convert userview back to db game
        // update database

        // run action handlers

        // return action
    }

    // sorry
    userViewToGame(view: UserView, game: Game): Game {
        let result: Game = game

        if (view.id !== game.id) throw new Error("View does not match game")
        if (view.userId === game.userIdChallenger) {
            result = {
                ...result,
                ...view,
                shipsChallenger: view.userShips,
                shipsChallenged: view.enemyShips,
                actionsChallenger: view.userActions,
                actionsChallenged: view.enemyActions,
                userIdChallenger: view.userId,
                userIdChallenged: view.enemyId
            }
        } else if (view.userId === game.userIdChallenged) {
            result = {
                ...result,
                ...view,
                shipsChallenged: view.userShips,
                shipsChallenger: view.enemyShips,
                actionsChallenged: view.userActions,
                actionsChallenger: view.enemyActions,
                userIdChallenged: view.userId,
                userIdChallenger: view.enemyId
            }
        } else {
            throw new Error("View user not in game")
        }

        return result
    }

    gameToUserView(game: Game, userId: string): UserView {
        let result: UserView

        if (userId === game.userIdChallenger) {
            const userActions = game.actionsChallenged
            const enemyActions = game.actionsChallenger
            result = {
                ...game,
                userId,
                userShips: game.shipsChallenger,
                userActions,
                enemyId: game.userIdChallenged,
                enemyShips: game.shipsChallenged,
                enemyActions,
                state:
                    game.shipsChallenged.length === 0 ||
                    game.shipsChallenger.length === 0
                        ? GameState.Plan
                        : userActions.length === enemyActions.length
                          ? GameState.Attack
                          : GameState.Defend
            }
        } else if (userId === game.userIdChallenged) {
            const userActions = game.actionsChallenger
            const enemyActions = game.actionsChallenged
            result = {
                ...game,
                userId,
                userShips: game.shipsChallenger,
                userActions,
                enemyId: game.userIdChallenged,
                enemyShips: game.shipsChallenged,
                enemyActions,
                state:
                    game.shipsChallenged.length === 0 ||
                    game.shipsChallenger.length === 0
                        ? GameState.Plan
                        : userActions.length === enemyActions.length
                          ? GameState.Defend
                          : GameState.Attack
            }
        } else {
            throw new Error("User is not a participant of this game")
        }

        return result
    }
}

function shipToCoords(ship: Ship) {
    const coords: Coordinate[] = new Array(ship.length).fill(ship.position)
    const x = coords.map((pos, i) =>
        ship.horizontal ? { ...pos, x: pos.x + i } : { ...pos, y: pos.y + i }
    )

    return x
}
