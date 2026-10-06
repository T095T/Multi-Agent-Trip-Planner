import React from 'react'
import { Plane, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className='border-b-4 border-black bg-[#fffdf5] text-black'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8'>
                {/*Logo */}
                <Link to="/" className='flex items-center'>
                    <div className='flex items-center gap-3 border-4 border-black bg-[#FFDE59] px-4 py-2 shadow-[5px_5px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#111]'>
                        <Plane
                            size={25}
                            strokeWidth={3}
                            className='rotate-12' />
                        <span className='text-2xl font-black tracking-tight'>
                            TRIPWISE
                        </span>
                    </div>
                </Link>

                {/*Navigation */}
                <div className='hidden items-center gap-10 font-black md:flex uppercase'>
                    <Link to="/" className='transition-transform hover:-translate-y-1'>
                        Home
                    </Link>

                    <a href="#explore" className='transition-transform hover:-translate-y-1'>
                        Explore
                    </a>

                    <a href="#about" className='transition-transform hover:-translate-y-1'>
                        About
                    </a>
                </div>
                {/*Right Side */}
                <div className='flex items-center gap-4'>
                    <Link to="/plan" className="group flex cursor-pointer items-center gap-2 border-4 border-black bg-[#ff7777] px-4 py-3 font-black shadow-[5px_5px_0_#111] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#111] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none">
                        START PLANNING
                        <ArrowRight
                            size={20}
                            strokeWidth={3}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>

                </div>
            </div>
        </nav>
    )
}
export default Navbar

