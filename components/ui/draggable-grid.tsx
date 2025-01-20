import Cell from "./cell";

export class Point{
  constructor(public x:number, public y:number){}
}

export type Spot = {
  color:string;
  selectedCells:boolean[][];
  points:Point[]
}

export interface GridProps{
    rows:number;
    columns:number;
    matrix:boolean[][];
    spots:Spot[];
    handleMouseDown:(rowIndex:number, colIndex:number) => void;
    handleMouseEnter:(rowIndex:number, colIndex:number) => void;
    handleMouseUp:() => void;
}

export default function DraggableGrid({ rows, columns, matrix, spots, handleMouseDown, handleMouseEnter, handleMouseUp }:GridProps){
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
          <div key={rowIndex} className="flex">
            {Array(columns).fill(null).map((_, colIndex) => (
              <Cell
                key={colIndex}
                rowIndex={rowIndex}
                columnIndex={colIndex}
                selected={matrix[rowIndex] && matrix[rowIndex][colIndex]}
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
  