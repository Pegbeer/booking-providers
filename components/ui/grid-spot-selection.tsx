import { CampaingDto } from "@/app/dto/campaing-dto";
import { BoxSelectIcon } from "lucide-react";

export interface Props {
    campaing: CampaingDto
}

export default function GridSpotSelection({ campaing }: Props) {
    console.log(campaing.spots)
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const areas = Array.from({length: campaing.rows },()=> 
        Array(campaing.columns).fill('.')
    );

    campaing.spots.forEach((spot, spotIndex) =>{
        spot.points.forEach(point =>{
            areas[point.x][point.y] = `s${spotIndex}`
        })
    })

    const gridTemplateAreas = areas.map(row => `"${row.join(' ')}"`).join(' ');

    const dynamicStyles:React.CSSProperties ={
        display: 'grid',
        gridTemplateColumns: `repeat(${campaing.columns},1fr)`,
        gridTemplateRows: `repeat(${campaing.rows},1fr)`,
        gridTemplateAreas: gridTemplateAreas,
        flexGrow: 1,
    }

    return (
        <div style={dynamicStyles} className="gap-2">
            {campaing.spots.map((spot,spotIndex) =>
                <div    
                    key={spot.id}
                    className="p-2 bg-slate-800 rounded flex items-center justify-center hover:cursor-pointer hover:border-4 hover:border-green-600 transition-colors"
                    style={{
                        gridArea: `s${spotIndex}`,
                    }}>

                        <BoxSelectIcon className="text-slate-50 size-12"/>
                </div>
            )}
        </div>
    );
}