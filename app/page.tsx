'use client';
import GridPanel from "@/lib/components/ui/grid-panel";
import { useState } from "react";

export default function Home() {
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [spots, setSpots] = useState(
    Array.from({ length: rows * columns }, (_, i) => ({ id: i + 1, reserved: false }))
  );

  const handleReserve = (id: number) => {
    setSpots((prevSpots) =>
      prevSpots.map((spot) =>
        spot.id === id ? { ...spot, reserved: false } : spot
      )
    );
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value);
    setRows(newRows);
    setSpots(
      Array.from({ length: newRows * columns }, (_, i) => ({
        id: i + 1, reserved: false,
      }))
    );
  };

  const handleColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumns = parseInt(e.target.value);
    setColumns(newColumns);
    setSpots(
      Array.from({ length: rows * newColumns }, (_, i) => ({
        id: i + 1, reserved: false,
      }))
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Reserva de campaña</h1>
      <div className="mb-4">
        <label className="mr-2">Filas:</label>
        <input
          type="number"
          value={rows}
          onChange={handleRowsChange}
          className="border p-2 text-black" />
        <label className="ml-4 mr-2">Columnas:</label>
        <input
          type="number"
          value={columns}
          onChange={handleColumnsChange}
          className="border p-2 text-black" />
      </div>
      <div className={`grid grid-cols-${columns} gap-4 border border-red-400`}>
        {spots.map(spot => (
          <div key={spot.id} className="bg-slate-300 p-4">
            Spot {spot.id}
          </div>
        ))}
      </div>
    </div>
  );
}
