import { ArrowLeft, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { createTrip } from "../services/api";

function TripPlanner() {
    const [destination, setDestination] = useState("")
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [preferences, setPreferences] = useState([]);

    //List of preferences
    const preferenceOptions = [
        "BEACHES",
        "FOOD",
        "ADVENTURE",
        "CULTURE",
        "RELAXED",
        "NIGHTLIFE",
    ];

    const togglePreference = (preference) => {
        setPreferences((current) => {
            if (current.includes(preference)) {
                return current.filter((p) => p !== preference);
            }
            return [...current, preference];
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tripData = {
            destination,
            start_date: startDate,
            end_date: endDate,
            budget: budget ? Number(budget) : null,
            preferences,
        };
        try {
            const result = await createTrip(tripData)
            console.log("backend response", result);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="min-h-screen bg-[#fffdf5]">

                {/* Header */}
                <header className="border-b-4 border-black bg-[#ffde59]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                        <button className="flex items-center gap-2 font-black">
                            <ArrowLeft size={22} strokeWidth={3} />
                            BACK
                        </button>

                        <div className="border-4 border-black bg-white px-4 py-2 font-black shadow-[4px_4px_0_#111]">
                            TRIPWISE
                        </div>

                        <div className="hidden items-center gap-2 font-black sm:flex">
                            <MapPin size={20} strokeWidth={3} />
                            BUILD YOUR TRIP
                        </div>

                    </div>
                </header>

                {/* Main */}
                <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">

                    <div className="mb-12">

                        <p className="mb-3 text-sm font-black tracking-[0.25em]">
                            LET'S GET STARTED
                        </p>

                        <h1 className="text-5xl font-black tracking-[-0.04em] sm:text-6xl">
                            BUILD YOUR
                            <span className="ml-3 inline-block bg-[#c8b6ff] px-3">
                                PERFECT TRIP.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-lg font-bold text-neutral-700">
                            Give our travel agents a few details and we'll take care of
                            the planning.
                        </p>

                    </div>

                    {/* Form*/}
                    <form onSubmit={handleSubmit}>
                        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_#111]">

                            <label
                                htmlFor="destination"
                                className="block text-2xl font-black"
                            >
                                WHERE ARE YOU GOING?
                            </label>

                            <p className="mt-2 font-bold text-neutral-600">
                                Pick a destination and we'll take it from there.
                            </p>

                            <div className="mt-6 flex items-center border-4 border-black bg-[#fffdf5] shadow-[4px_4px_0_#111]">

                                <div className="flex items-center justify-center border-r-4 border-black bg-[#ffde59] p-4">
                                    <MapPin size={26} strokeWidth={3} />
                                </div>

                                <input
                                    id="destination"
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="e.g. Goa, Bali, Tokyo..."
                                    className="w-full bg-transparent px-4 py-4 text-lg font-bold outline-none placeholder:text-neutral-400"
                                />


                            </div>
                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                {/*Start date*/}
                                <div className="border-4 border-black bg-[#c8b6ff] p-5 shadow-[6px_6px_0_#111]">
                                    <label htmlFor="start-date" className="block text-xl font-black uppercase">
                                        When do you leave?
                                    </label>
                                    <input
                                        id="start-date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="mt-4 w-full border-4 border-black bg-white px-4 py-3 text-lg font-bold outline-none"
                                    />

                                </div>
                                <div className="border-4 border-black bg-[#8ed8ff] p-5 shadow-[6px_6px_0_#111]">

                                    <label
                                        htmlFor="end-date"
                                        className="block text-xl font-black"
                                    >
                                        WHEN DO YOU RETURN?
                                    </label>

                                    <input
                                        id="end-date"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="mt-4 w-full border-4 border-black bg-white px-4 py-3 text-lg font-black outline-none"
                                    />

                                </div>

                            </div>
                            <div className="mt-6 border-4 border-black bg-[#ffde59] p-6 shadow-[7px_7px_0_#111]">

                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-2xl font-black">
                                            WHAT'S YOUR BUDGET?
                                        </p>

                                        <p className="mt-1 font-bold text-neutral-700">
                                            Give us a rough amount for the entire trip.
                                        </p>
                                    </div>

                                    <span className="hidden border-4 border-black bg-white px-3 py-1 font-black sm:block">
                                        INR
                                    </span>
                                </div>

                                <div className="mt-6 flex items-center border-4 border-black bg-white shadow-[4px_4px_0_#111]">

                                    <div className="border-r-4 border-black px-5 py-4 text-2xl font-black">
                                        ₹
                                    </div>

                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="25000"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="w-full bg-transparent px-4 py-4 text-xl font-black outline-none placeholder:text-neutral-400"
                                    />

                                </div>

                            </div>
                            <div className="mt-6 border-4 border-black bg-[#ff8ee8] p-6 shadow-[7px_7px_0_#111]">

                                <p className="text-2xl font-black">
                                    WHAT DO YOU LOVE?
                                </p>

                                <p className="mt-1 font-bold text-neutral-700">
                                    Pick as many as you want.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">

                                    {preferenceOptions.map((preference) => {
                                        const selected = preferences.includes(preference);

                                        return (
                                            <button
                                                key={preference}
                                                type="button"
                                                onClick={() => togglePreference(preference)}
                                                className={`
            border-4 border-black
            px-4 py-3
            font-black
            shadow-[4px_4px_0_#111]
            transition-all
            ${selected
                                                        ? "translate-x-[3px] translate-y-[3px] bg-[#8ed8ff] shadow-[1px_1px_0_#111]"
                                                        : "bg-white hover:-translate-y-1"
                                                    }
          `}
                                            >
                                                {selected && "✓ "}
                                                {preference}
                                            </button>
                                        );
                                    })}

                                </div>

                            </div>
                            <button
                                type="submit"
                                className="mt-8 flex w-full items-center justify-center gap-3 border-4 border-black bg-[#ff7777] px-6 py-4 text-xl font-black shadow-[7px_7px_0_#111] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#111]"
                            >
                                PLAN MY TRIP
                                <ArrowRight size={25} strokeWidth={4} />
                            </button>


                        </div>
                    </form>


                </main>

            </div>

        );
    }

    export default TripPlanner;