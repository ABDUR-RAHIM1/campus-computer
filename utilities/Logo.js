import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={"/"} className="flex items-center group select-none">
            <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 rounded-xl shadow-md group-hover:shadow-blue-200 transition-all duration-300 overflow-hidden">
                
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                
                <span className="text-white text-3xl md:text-4xl font-black italic">
                    C
                </span>

                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
            </div>

            <div className="ml-1 flex flex-col justify-center border-l-2 border-gray-100 pl-2">
                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 leading-none flex items-baseline">
                    <span className="text-blue-600 group-hover:text-indigo-600 transition-colors">A</span>
                    <span className="text-slate-700">MPUS</span>
                </span>
                <span className="text-[9px] md:text-[11px] font-black tracking-[0.3em] text-slate-400 uppercase leading-none mt-1 group-hover:text-blue-500 transition-colors">
                    OMPUTER
                </span>
            </div>
        </Link>
    )
}