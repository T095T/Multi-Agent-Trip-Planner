import {
  ArrowDownRight,
  ArrowRight,
  MapPin,
  Palmtree,
  Utensils,
  Mountain,
  Plane,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffdf5]">

      <Navbar />

      {/* HERO */}
      <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">

        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT SIDE */}
          <section>

            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 border-4 border-black bg-[#c8b6ff] px-4 py-2 font-black shadow-[5px_5px_0_#111]">
              <Plane size={18} strokeWidth={3} />
              AI-POWERED TRAVEL PLANNER
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-6xl font-black leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-8xl">

              YOUR NEXT

              <span className="relative my-2 block w-fit">

                <span className="relative z-10">
                  ADVENTURE
                </span>

                <span className="absolute inset-x-[-8px] bottom-1 z-0 h-[42%] -rotate-1 bg-[#ffde59]" />

              </span>

              STARTS HERE.

            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg font-bold leading-relaxed sm:text-xl">
              Tell us where you want to go, and our AI travel agents will
              research, plan, and create a personalized trip just for you.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-6">

              <button
                onClick={() => navigate("/plan")}
                className="group flex cursor-pointer items-center gap-3 border-4 border-black bg-[#ff7777] px-7 py-4 text-lg font-black shadow-[7px_7px_0_#111] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[3px_3px_0_#111]"
              >

                PLAN MY TRIP

                <ArrowRight
                  size={24}
                  strokeWidth={4}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

              <div className="flex items-center gap-2 font-black">
                <span className="text-2xl">✦</span>
                NO BORING ITINERARIES
              </div>

            </div>

          </section>


          {/* RIGHT SIDE — TRAVEL COLLAGE */}
          <section className="relative min-h-[500px]">

            {/* Decorative arrow */}
            <ArrowDownRight
              size={70}
              strokeWidth={3}
              className="absolute -left-8 top-10 z-20 hidden rotate-12 lg:block"
            />

            {/* Main postcard */}
            <div className="absolute left-[5%] top-[5%] z-10 w-[82%] rotate-[-3deg] border-4 border-black bg-white p-3 shadow-[10px_10px_0_#111]">

              <div className="relative h-[330px] overflow-hidden border-4 border-black bg-[#78c6ff]">

                {/* Travel image */}
                <img
                  src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85"
                  alt="Tropical beach destination"
                  className="h-full w-full object-cover"
                />

                {/* Destination sticker */}
                <div className="absolute left-5 top-5 border-4 border-black bg-[#ffde59] px-5 py-2 text-3xl font-black shadow-[5px_5px_0_#111]">
                  GOA
                </div>

              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-4">

                <div className="flex items-center gap-2 font-black">
                  <Palmtree size={22} strokeWidth={3} />
                  BEACHES
                </div>

                <div className="flex items-center gap-2 font-black">
                  <Utensils size={22} strokeWidth={3} />
                  FOOD
                </div>

                <div className="flex items-center gap-2 font-black">
                  <Mountain size={22} strokeWidth={3} />
                  ADVENTURE
                </div>

              </div>

            </div>


            {/* Smaller destination card */}
            <div className="absolute right-0 top-[25%] z-20 w-[40%] rotate-[7deg] border-4 border-black bg-white p-2 shadow-[7px_7px_0_#111]">

              <div className="relative h-44 overflow-hidden border-4 border-black">

                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=85"
                  alt="Mountain destination"
                  className="h-full w-full object-cover"
                />

                <div className="absolute right-2 top-2 border-4 border-black bg-[#ff8ee8] px-3 py-1 font-black">
                  MANALI
                </div>

              </div>

            </div>


            {/* Explore stamp */}
            <div className="absolute right-[5%] top-[2%] z-30 flex h-28 w-28 rotate-12 items-center justify-center rounded-full border-4 border-black bg-[#ff7777] text-center font-black leading-tight shadow-[5px_5px_0_#111]">
              <div>
                <div className="text-2xl">✦</div>
                EXPLORE
                <br />
                MORE
              </div>
            </div>


            {/* Sticky note */}
            <div className="absolute bottom-[4%] right-[4%] z-30 w-40 rotate-[-5deg] border-4 border-black bg-[#ffde59] p-5 font-black shadow-[6px_6px_0_#111]">
              <MapPin size={25} strokeWidth={3} />

              <p className="mt-3 text-lg leading-tight">
                Good places.
                <br />
                Great stories.
                <br />
                ✦
              </p>
            </div>

          </section>

        </div>


        {/* Feature strip */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">

          <div className="border-4 border-black bg-[#c8b6ff] p-6 shadow-[6px_6px_0_#111]">
            <p className="text-2xl font-black">01 / RESEARCH</p>
            <p className="mt-2 font-bold">
              Destination information tailored to your trip.
            </p>
          </div>

          <div className="border-4 border-black bg-[#ffde59] p-6 shadow-[6px_6px_0_#111]">
            <p className="text-2xl font-black">02 / PLAN</p>
            <p className="mt-2 font-bold">
              A day-by-day itinerary built around you.
            </p>
          </div>

          <div className="border-4 border-black bg-[#8ed8ff] p-6 shadow-[6px_6px_0_#111]">
            <p className="text-2xl font-black">03 / TRAVEL</p>
            <p className="mt-2 font-bold">
              Stays and transport brought together.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;