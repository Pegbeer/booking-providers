type Spot = {
    id: number;
    reserved: boolean;
}

type GridProps = {
    rows: number;
    columns: number;
    spots: Spot[]
}

export default function GridPanel({ rows, columns, spots }: GridProps) {
    const gridClasses = `grid grid-cols-${columns} grid-rows-${rows} gap-4`;

    return (
        <div className={gridClasses}>
            {spots.map((spot) => (
                <GridItem key={spot.id} text={`Spot ${spot.id}`}/>
            ))}
        </div>
    );
}

interface ItemProps{
    text:string;
}

const GridItem = ({text}:ItemProps) => {
    return (
        <div className="bg-slate-400 rounded p-4">
            {text}
        </div>
    );
}