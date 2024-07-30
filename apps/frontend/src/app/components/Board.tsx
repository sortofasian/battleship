export function Board({
    onSelect,
    styleCell,
    active
}: {
    active: boolean
    styleCell: (cell: number) => string
    onSelect: (cell: number) => void
}) {
    return (
        <div className="m-5 grid size-80 grid-cols-10 grid-rows-10 border border-gray-400">
            {Array(10 * 10)
                .fill(undefined)
                .map((_, i) => (
                    <div
                        key={i}
                        onClick={() => onSelect(i)}
                        className={`border-2 border-gray-400 duration-200 ${active ? "hover:border-black" : ""} ${styleCell(i)}`}
                    ></div>
                ))}
        </div>
    )
}
