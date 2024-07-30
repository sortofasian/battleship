import { GameSetupDto } from "@hs-intern/api"
import { Coordinate, Ship } from "@prisma/client"
import { useContext, useEffect, useState } from "react"
import { useLocation } from "wouter"

import useApi from "../useApi"
import { UserContext } from "../userContext"
import { Board } from "./components/Board"

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

export function Setup({ id }: { id: string }) {
    const [, nav] = useLocation()
    const { user } = useContext(UserContext)
    const api = useApi(user?.token)

    const [ships, setShips] = useState<Ship[]>([])
    const [cells, setCells] = useState<boolean[]>(Array(100).fill(false))
    const [horizontal, setHorizontal] = useState<boolean>(false)
    const [pending, setPending] = useState<boolean>(false)

    async function submit() {
        setPending(true)
        try {
            // Post GameSetupDto to `games/${id}/setup
            // Get games/${id}/setup to wait for the opponent to set up their board
            nav(`/game/${id}`)
        } catch (e) {
            setPending(false)
            throw e
        }
    }

    useEffect(() => {
        const newCells = ships.reduce((update, ship) => {
            // for every cell in every ship, set the corresponding cell of update to true

            return update
        }, Array(100).fill(false))

        setCells(newCells)
    }, [ships])

    return (
        <>
            {!pending ? (
                <>
                    <button onClick={submit}>Submit</button>
                    <button onClick={() => setHorizontal(!horizontal)}>
                        {horizontal ? "Vertical" : "Horizontal"}
                    </button>
                    <button onClick={() => setShips(ships.slice(0, -1))}>
                        Undo
                    </button>
                </>
            ) : (
                <></>
            )}
            <Board
                active={!pending}
                onSelect={(cell) => {
                    // If 5 ships are placed, or if ships are out of bounds, do not proceed to set ships
                    setShips([
                        ...ships,
                        { horizontal, length: 5, position: cellToCoord(cell) }
                    ])
                }}
                styleCell={(cell) => {
                    switch (cells[cell]) {
                        case false:
                            return ""
                        case true:
                            return "bg-gray-400"
                    }
                }}
            />
        </>
    )
}
