import NewGame from "./NewGame"

export default function () {
    return (
        <div className="bg-blue-600 h-full w-full grid p-9 gap-2 grid-cols-3 grid-rows-3">
            <div className="bg-blue-300 rounded-lg">Test</div>
            <div className="bg-blue-300 rounded-lg row-span-2 col-span-2">
                Games
            </div>
            <div className="bg-blue-300 rounded-lg row-span-2">
                <NewGame />
            </div>
            <div className="bg-blue-300 rounded-lg col-span-2" />
        </div>
    )
}
