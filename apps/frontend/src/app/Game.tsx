import { GameResponseDto, GameState } from "@hs-intern/api"
import { useContext, useEffect, useState } from "react"

import useApi from "../useApi"
import { UserContext } from "../userContext"
import { Coordinate, Ship } from "@prisma/client"
import { Board } from "./components/Board"

enum CellState {
    Empty,
    Ship,
    Hit,
    Miss
}

function cellToCoord(i: number) {
    return { x: i % 10, y: Math.floor(i / 10) }
}

function coordToCell({ x, y }: Coordinate) {
    return y * 10 + x
}

function shipToCells(ship: Ship) {
    const cells = new Array(ship.length).fill(coordToCell(ship.position))
    return cells.map((cell, i) => (ship.horizontal ? cell + i : cell + i * 10))
}

function shipToCoords(ship: Ship) {
    const coords: Coordinate[] = new Array(ship.length).fill(ship.position)
    const x = coords.map((pos, i) =>
        ship.horizontal ? { ...pos, x: pos.x + i } : { ...pos, y: pos.y + i }
    )

    return x
}

export function Game({ id: gameId }: { id: string }) {
    const { user } = useContext(UserContext)
    const api = useApi(user?.token)

    const [game, setGame] = useState<GameResponseDto | undefined>(undefined)
    const [cells, setCells] = useState<{
        user: CellState[]
        enemy: CellState[]
    }>({ user: [], enemy: [] })

    // Initial useEffect to get data
    useEffect(() => {
        ;(async () => {
            // get the game state from api and setGame
        })()
    }, [])

    // Updates state when game is updated
    useEffect(() => {
        ;(async () => {
            if (!game) return

            // If the gamestate is Defend, make a GET to games/${id}/act

            let userCells: CellState[] = new Array(100).fill(CellState.Empty)
            let enemyCells: CellState[] = new Array(100).fill(CellState.Empty)

            // Update user cells with user ships
            // Reduce ships to a cell array
            // For every cell in every ship (recursion!), put the Ship cell state into the new cell array
            userCells = // code...

            // Update user cells with actions from enemy
            // Do this by reducing enemy game actions to a cell array
            // If the action hits, then set the cell state to Hit, if not then Miss
            userCells = // code...

            // Do the same as above but with actionsUser and modify enemyCells
            enemyCells = // code ...

            setCells({
                user: userCells,
                enemy: enemyCells
            })
        })()
    }, [game])

    function userCellStyle(cell: number) {
        switch (cells.user[cell]) {
            case CellState.Empty:
                return ""
            case CellState.Hit:
                return "bg-red-400"
            case CellState.Miss:
                return "bg-green-200"
            case CellState.Ship:
                return "bg-gray-400"
        }
    }

    function enemyCellStyle(cell: number) {
        switch (cells.enemy[cell]) {
            case CellState.Empty:
                return ""
            case CellState.Ship:
                return ""
            case CellState.Hit:
                return "bg-red-400"
            case CellState.Miss:
                return "bg-gray-300"
        }
    }

    async function enemyCellSelect(cell: number) {
        if (game?.state !== GameState.Attack) return

        // POST a GameActDto to games/${id}/act
        // You only get a cell number, not a Coordinate, so it needs conversion
    }

    return (
        <div className="flex flex-col w-full">
            <div className="m-auto flex">
                <div
                    className={`size-80 duration-300 delay-500
                    ${game?.state === GameState.Defend ? "m-5" : "w-0"}`}
                />
                <Board
                    active={false}
                    onSelect={() => {}}
                    styleCell={userCellStyle}
                />
                <Board
                    active={true}
                    onSelect={enemyCellSelect}
                    styleCell={enemyCellStyle}
                />
                <div
                    className={`size-80 duration-300 delay-500
                    ${game?.state === GameState.Attack ? "m-5" : "w-0"}`}
                />
            </div>
        </div>
    )
}
