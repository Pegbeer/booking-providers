"use client";

import { useEffect, useState } from "react";

export interface CounterProps {
    label: string;
    onValueChanged: (value: number) => void;
}

export default function Counter({ label, onValueChanged }: CounterProps) {

    const [value,setValue] = useState(0);

    const decrease = () =>{
        if(value == 0) return;
        setValue(value - 1);
    }

    const increase = () =>{
        setValue(value + 1);
    }

    useEffect(() =>{
        onValueChanged(value)
    },[value,onValueChanged]);

    return (
        <div className="flex items-center gap-3">
            <label>{label}</label>
            <div className="flex items-center">
                <button className="border bg-slate-200 px-2" onClick={decrease}>-</button>
                <input 
                className="border border-slate-200 w-12 text-center" 
                type="number" 
                placeholder="0"
                value={value} 
                onChange={(e) => setValue(Number(e.target.value))}/>
                <button className="border bg-slate-200 px-2" onClick={increase}>+</button>
            </div>
        </div>
    );
}