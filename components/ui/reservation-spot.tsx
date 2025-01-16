import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

export type Spot = {
    color:string;
    selectedCells:boolean[][];
}


export interface ReservationSpotProps{
    spot:Spot
}

export default function ReservationSpot({spot}:ReservationSpotProps) {
    return (
        <div className={`flex justify-center items-center border-dotted border border-slate-800 hover:cursor-pointer overflow-clip`} style={{ backgroundColor: spot.color}}>
            
        </div>
    );
}
