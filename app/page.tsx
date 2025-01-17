'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import Grid, { Point, Spot } from "@/components/ui/grid";
import { CampaingDto } from "./dto/campaing-dto";
import { createCampaing } from "./actions/actions";
import { Campaing } from "@prisma/client";

export default function Home() {
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected] = useState<boolean[][]>([])
  const startCellRef = useRef<[number, number] | null>(null)

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') return;
    const newRows = parseInt(e.target.value);
    setRows(newRows);
  };

  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') return;
    const newColumns = parseInt(e.target.value);
    setColumns(newColumns);
  };

  const handleMouseDown = useCallback((rowIndex: number, colIndex: number) => {
    setSelecting(true)
    startCellRef.current = [rowIndex, colIndex]
    setSelected(prev => {
      const newSelected = prev.map(row => row ? [...row] : []);
      newSelected[rowIndex] = newSelected[rowIndex] || [];
      newSelected[rowIndex][colIndex] = !newSelected[rowIndex][colIndex];
      return newSelected;
    })
  }, [])

  const handleMouseEnter = useCallback((rowIndex: number, colIndex: number) => {
    if (selecting && startCellRef.current) {
      const [startRow, startCol] = startCellRef.current
      setSelected(prev => {
        const newSelected = prev.map(row => row ? [...row] : []);
        for (let i = Math.min(startRow, rowIndex); i <= Math.max(startRow, rowIndex); i++) {
          for (let j = Math.min(startCol, colIndex); j <= Math.max(startCol, colIndex); j++) {
            newSelected[i][j] = true
          }
        }
        return newSelected
      })
    }
  }, [selecting])

  const getPoints = ():Point[] =>{
    let points:Point[] = [];
    for(let x = 0; x < selected.length; x++){
      for(let y = 0; y < selected[x].length; y++){
        if(selected[x][y]){
          points.push(new Point(x,y));
        }
      }
    }
    return points;
  }

  const handleMouseUp = useCallback(() => {
    setSelecting(false)
    startCellRef.current = null

    setSpots(prevSpots => [
      ...prevSpots,
      {
        color: getRandomColor(),
        selectedCells: selected.map(row => [...row]),
        points: getPoints()
      }
    ]);

    setSelected(
      Array(rows).fill(null).map(() => Array(columns).fill(false))
    );

  }, [selected, rows, columns]);

  useEffect(() => {
    if (rows > 0 && columns > 0) {
      setSelected(
        Array(rows).fill(null).map(() => Array(columns).fill(false))
      );
      setSpots([]);
    } else {
      setSelected([]);
      setSpots([]);
    }
  }, [rows, columns]);

  useEffect(() =>{
    console.log(spots)
  },[spots])


  const handleSaveCampaing = async(e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault()
    const dto:CampaingDto = {
      columns: columns,
      rows: rows,
      spots: spots.map(it => ({
        color: it.color,
        points: it.points.map(p => ({
          x: p.x,
          y: p.y
        }))
      }))
    }

    await createCampaing(dto);
  }

  return (
    <div className="container mx-auto h-full flex flex-col space-y-4  p-6">
      <h1 className="text-2xl font-bold">Diseño de campaña</h1>
      <span>Aqui puedes definir la estructura que tendra la campaña de los espacios publicitarios</span>
      <div className="flex gap-2 items-center justify-start">
        <label className="mr-2">Filas:</label>
        <input
          type="number"
          value={rows}
          max={9}
          min={1}
          aria-errormessage="El maximo es 9 y el minimo es 1"
          onChange={handleRowsChange}
          className="border rounded p-1 text-black" />
        <label className="sm:ml-4 mr-2">Columnas:</label>
        <input
          type="number"
          value={columns}
          max={9}
          min={1}
          aria-errormessage="El maximo es 9 y el minimo es 1"
          onChange={handleColumnsChange}
          className="border rounded p-1 text-black" />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-slate-900 w-min p-2 text-sm text-slate-50 rounded hover:opacity-75" onClick={handleSaveCampaing}>Guardar</button>
        <span className="font-semibold">Slots: {spots.length}</span>
      </div>
      <span className="text-center font-medium">Selecciona y arrastra por los espacios para definir un slot</span>
      <Grid
        rows={rows}
        columns={columns}
        matrix={selected}
        spots={spots}
        handleMouseUp={handleMouseUp}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter} />
    </div>
  );
}