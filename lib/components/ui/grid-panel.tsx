"use client";

import { useEffect, useState } from "react";
import Counter from "./counter";

export default function GridPanel() {
    const [rows, setRows] = useState(0);
    const [columns, setColumns] = useState(0);

    const handleRowValue = (value: number) => {
        setRows(value);
    }

    const handleColumnsValue = (value: number) => {
        setColumns(value);
    }
    

    return (
        <div className="flex">
            <aside className="flex flex-col space-y-4 h-max sm:max-w-[325px] p-6 border border-red-300">
                <Counter label="Filas" onValueChanged={handleRowValue} />
                <Counter label="Columnas" onValueChanged={handleColumnsValue} />
            </aside>
            <main className="flex-grow flex flex-wrap">
                
            </main>
        </div>
    );
}