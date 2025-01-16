import Cell from "./cell";
import { Spot } from "./reservation-spot";

export interface GridProps{
    rows:number;
    columns:number;
    selected:boolean[][];
    spots:Spot[];
    handleMouseDown:(rowIndex:number, colIndex:number) => void;
    handleMouseEnter:(rowIndex:number, colIndex:number) => void;
    handleMouseUp:() => void;
}

export default function Grid({ rows, columns, selected, spots, handleMouseDown, handleMouseEnter, handleMouseUp }:GridProps){
    const getBackgroundColor = (rowIndex: number, colIndex: number) => {
      for (const spot of spots) {
        if (spot.selectedCells[rowIndex] && spot.selectedCells[rowIndex][colIndex]) {
          return spot.color;
        }
      }
      return '';
    };
  
    return (
      <div
        className="select-none"
        onMouseUp={handleMouseUp}
      >
        {Array(rows).fill(null).map((_, rowIndex) => (
          <div key={rowIndex} className="flex ">
            {Array(columns).fill(null).map((_, colIndex) => (
              <Cell
                key={colIndex}
                rowIndex={rowIndex}
                columnIndex={colIndex}
                selected={selected[rowIndex] && selected[rowIndex][colIndex]}
                color={getBackgroundColor(rowIndex, colIndex)}
                onMouseDownCallback={handleMouseDown}
                onMouseEnterCallback={handleMouseEnter}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };
  