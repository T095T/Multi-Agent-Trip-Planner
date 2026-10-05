import React from 'react'
import { Plane, Globe2, ArrowRight } from "lucide-react"

function Navbar() {
    return (
        <nav className='border-b-4 border-black bg-[#fffdf5] text-black'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8'>
                {/*Logo */}
                <div className='flex items-center'>
                    <div className='flex items-center gap-3 border-4 border-black bg-[#FFDE59] px-4 py-2 shadow-[5px_5px_0_#111]'>
                        <Plane
                            size={25}
                            strokeWidth={3}
                            className='rotate-12' />
                        <span className='text-2xl font-black tracking-tight'>
                            TRIPWISE
                        </span>
                    </div>
                </div>

                {/*Navigation */}
                <div className='hidden items-center gap-10 font-black md:flex uppercase'>
                    <a href="#explore" className='transition-transform hover:-translate-y-1'>
                        Explore
                    </a>

                    <a href="#trips" className='transition-transform hover:-translate-y-1'>
                        My trips
                    </a>

                    <a href="#about" className='transition-transform hover:-translate-y-1'>
                        About
                    </a>

                </div>
                {/*Right Side */}
                <div className='flex items-center gap-4'>
                    {/* <button className='group hidden cursor-pointer items-center gap-2 font-bold sm:flex'>
                        <Globe2
                            size={20}
                            strokeWidth={3}
                            className='transition-transform group-hover:rotate-12'
                        />
                    </button> */}
                    <button className="group flex cursor-pointer items-center gap-2 border-4 border-black bg-[#ff7777] px-4 py-3 font-black shadow-[5px_5px_0_#111] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#111] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none">
                        START PLANNING
                        <ArrowRight
                            size={20}
                            strokeWidth={3}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </button>

                </div>
            </div>
        </nav>
    )
}
export default Navbar

