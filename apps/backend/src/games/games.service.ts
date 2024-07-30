import { GameState } from "@hs-intern/api"
import { Injectable } from "@nestjs/common"
import { Action, Game, Ship } from "@prisma/client"

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
    }

    async awaitSetup(id: string) {
        // create a function that compares id to an id passed to the function
        // push the function to this.setupListeners
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
