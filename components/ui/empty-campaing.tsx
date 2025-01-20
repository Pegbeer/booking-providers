'use client'
import emptyAnimation from '@/public/assets/anim/empty.json';
import { useLottie } from 'lottie-react';


export default function EmptyCampaign() {
    const { View } = useLottie({animationData: emptyAnimation,loop: true})
    return (
        <div className='container flex flex-col h-full items-center justify-center'>
            <div className='max-w-96'>{View}</div>
            <h4 className='font-semibold text-2xl'>No hay ninguna campaña activa</h4>
        </div>
    );
}