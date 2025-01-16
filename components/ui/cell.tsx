import clsx from "clsx";

export interface CellProps{
    rowIndex:number;
    columnIndex:number;
    selected: boolean;
    color:string;
    onMouseDownCallback:(rowIndex:number,colIndex:number) => void;
    onMouseEnterCallback:(rowIndex:number,colIndex:number) => void;
}

export default function Cell({
    rowIndex,
    columnIndex,
    selected,
    color,
    onMouseDownCallback,
    onMouseEnterCallback,
  }:CellProps){
    return (
      <div
        className={clsx(
          "h-36 border-2 border-dotted border-slate-900 cursor-pointer flex-grow",
          selected ? 'bg-blue-400' : 'bg-slate-300 '
        )}
        style={{ backgroundColor: color }}
        onMouseDown={() => onMouseDownCallback(rowIndex, columnIndex)}
        onMouseEnter={() => onMouseEnterCallback(rowIndex, columnIndex)}
      />
    );
  };
  