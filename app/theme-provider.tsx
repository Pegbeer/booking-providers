'use client';
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";

const NoSSRThemeProvider = dynamic(() => import('next-themes').then(mod => mod.ThemeProvider),{ ssr: false });


interface Props{
    children: React.ReactNode
}

export default function CustomThemeProvider({children}:Props){
    return (
        <NoSSRThemeProvider attribute='class'>
            {children}
        </NoSSRThemeProvider>
    );
}