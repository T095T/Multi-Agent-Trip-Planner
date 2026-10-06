import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Check,
    MapPin,
    CalendarDays,
    Wallet,
    Hotel,
    Plane,
    Compass,
    Sparkles,
    WalletCards,
    MessageSquare,
    Clock3
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getTrip, reviewTrip } from "../services/api";


function TripResults() {
    const { threadId } = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);

    const [loading, setLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(false);

    const [feedback, setFeedback] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);

    const [error, setError] = useState("");


    useEffect(() => {
        async function loadTrip() {
            try {
                setLoading(true);

                const data = await getTrip(threadId);

                setTrip(data);

            } catch (error) {
                console.error(error);
                setError("Unable to load your trip.");

            } finally {
                setLoading(false);
            }
        }

        loadTrip();
    }, [threadId]);


    const handleApprove = async () => {
        try {
            setReviewLoading(true);
            setError("");

            const result = await reviewTrip(threadId, {
                approved: true,
                feedback: null,
            });

            setTrip((current) => ({
                ...current,
                status: result.status,
            }));

        } catch (error) {
            console.error(error);
            setError("Unable to approve the trip.");

        } finally {
            setReviewLoading(false);
        }
    };


    const handleRequestChanges = async () => {
        if (!feedback.trim()) {
            return;
        }

        try {
            setReviewLoading(true);
            setError("");

            await reviewTrip(threadId, {
                approved: false,
                feedback: feedback.trim(),
            });

            const updatedTrip = await getTrip(threadId);
            setTrip(updatedTrip);

            setFeedback("");
            setShowFeedback(false);

        } catch (error) {
            console.error(error);
            setError("Unable to request changes.");

        } finally {
            setReviewLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fffdf5] p-6">

                <div className="border-4 border-black bg-[#ffde59] p-8 text-center shadow-[8px_8px_0_#111]">

                    <div className="text-4xl font-black">
                        BUILDING YOUR TRIP...
                    </div>

                    <p className="mt-3 font-bold">
                        Our travel agents are working on it.
                    </p>

                </div>

            </div>
        );
    }


    if (error || !trip) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fffdf5] p-6">

                <div className="border-4 border-black bg-[#ff7777] p-8 shadow-[8px_8px_0_#111]">

                    <h1 className="text-3xl font-black">
                        SOMETHING WENT WRONG
                    </h1>

                    <p className="mt-3 font-bold">
                        {error || "Trip not found."}
                    </p>

                    <button
                        onClick={() => navigate("/plan")}
                        className="mt-6 border-4 border-black bg-white px-5 py-3 font-black shadow-[4px_4px_0_#111]"
                    >
                        BUILD ANOTHER TRIP
                    </button>

                </div>

            </div>
        );
    }


    const isCompleted = trip.status === "completed";


    return (
        <div className="min-h-screen bg-[#fffdf5]">

            {/* Header */}

            <header className="border-b-4 border-black bg-[#ffde59]">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                    <button
                        onClick={() => navigate("/plan")}
                        className="flex items-center gap-2 font-black"
                    >
                        <ArrowLeft size={22} strokeWidth={3} />
                        NEW TRIP
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="cursor-pointer border-4 border-black bg-white px-4 py-2 font-black shadow-[4px_4px_0_#111] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#111]"
                    >
                        TRIPWISE
                    </button>

                    <div className="hidden items-center gap-2 font-black sm:flex">
                        <Compass size={20} strokeWidth={3} />
                        YOUR TRIP
                    </div>

                </div>

            </header>


            <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">

                {/* Hero */}

                <section className="border-4 border-black bg-[#c8b6ff] p-6 shadow-[8px_8px_0_#111] md:p-8">

                    <p className="text-sm font-black tracking-[0.25em]">
                        YOUR AI TRAVEL PLAN
                    </p>

                    <h1 className="mt-3 text-5xl font-black tracking-[-0.04em] sm:text-6xl">
                        {trip.destination.toUpperCase()}
                    </h1>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <div className="flex items-center gap-2 border-4 border-black bg-white px-4 py-3 font-black shadow-[4px_4px_0_#111]">
                            <CalendarDays size={20} strokeWidth={3} />
                            {trip.start_date} → {trip.end_date}
                        </div>

                        {trip.budget && (
                            <div className="flex items-center gap-2 border-4 border-black bg-[#ffde59] px-4 py-3 font-black shadow-[4px_4px_0_#111]">
                                <Wallet size={20} strokeWidth={3} />
                                ₹{trip.budget}
                            </div>
                        )}

                    </div>

                </section>


                {/* Research */}

                {trip.research && (
                    <section className="mt-8 border-4 border-black bg-white p-6 shadow-[7px_7px_0_#111]">

                        <div className="flex items-center gap-3">

                            <div className="border-4 border-black bg-[#8ed8ff] p-3">
                                <MapPin size={25} strokeWidth={3} />
                            </div>

                            <h2 className="text-3xl font-black">
                                DESTINATION RESEARCH
                            </h2>

                        </div>


                        {trip.research.overview && (
                            <p className="mt-6 text-lg font-bold leading-relaxed text-neutral-700">
                                {trip.research.overview}
                            </p>
                        )}


                        <div className="mt-6 grid gap-4 md:grid-cols-2">

                            {trip.research.weather && (
                                <div className="border-4 border-black bg-[#ffde59] p-4">

                                    <p className="text-sm font-black tracking-widest">
                                        WEATHER
                                    </p>

                                    <p className="mt-2 font-bold">
                                        {trip.research.weather}
                                    </p>

                                </div>
                            )}


                            {trip.research.safety_notes && (
                                <div className="border-4 border-black bg-[#ff8ee8] p-4">

                                    <p className="text-sm font-black tracking-widest">
                                        SAFETY
                                    </p>

                                    <p className="mt-2 font-bold">
                                        {trip.research.safety_notes}
                                    </p>

                                </div>
                            )}

                        </div>


                        {trip.research.top_attractions?.length > 0 && (
                            <div className="mt-6">

                                <h3 className="text-xl font-black">
                                    TOP ATTRACTIONS
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-3">

                                    {trip.research.top_attractions.map((place, index) => (
                                        <div
                                            key={index}
                                            className="border-4 border-black bg-[#fffdf5] px-4 py-3 font-black shadow-[3px_3px_0_#111]"
                                        >
                                            {place}
                                        </div>
                                    ))}

                                </div>

                            </div>
                        )}

                    </section>
                )}


                {/* Itinerary */}

                {/* Itinerary */}

                <section className="mt-8 border-4 border-black bg-[#8ed8ff] p-6 shadow-[7px_7px_0_#111] md:p-8">

                    {/* Section heading */}

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                        <div className="flex items-center gap-3">

                            <div className="border-4 border-black bg-white p-3 shadow-[3px_3px_0_#111]">
                                <CalendarDays size={25} strokeWidth={3} />
                            </div>

                            <div>
                                <p className="text-sm font-black tracking-[0.2em]">
                                    DAY BY DAY
                                </p>

                                <h2 className="text-3xl font-black">
                                    ITINERARY
                                </h2>
                            </div>

                        </div>

                        <div className="w-fit border-4 border-black bg-[#ffde59] px-4 py-2 font-black shadow-[3px_3px_0_#111]">
                            {trip.itinerary.length} DAYS
                        </div>

                    </div>


                    {/* Days */}

                    <div className="mt-8 space-y-8">

                        {trip.itinerary.map((day, dayIndex) => {

                            const dayColors = [
                                "bg-[#c8b6ff]",
                                "bg-[#ff8ee8]",
                                "bg-[#ffde59]",
                                "bg-[#ff7777]",
                            ];

                            const dayColor =
                                dayColors[dayIndex % dayColors.length];

                            return (

                                <article
                                    key={day.day}
                                    className="relative border-4 border-black bg-white shadow-[6px_6px_0_#111]"
                                >

                                    {/* Day header */}

                                    <div className={`${dayColor} border-b-4 border-black p-5 md:p-6`}>

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="flex items-center gap-4">

                                                <div className="flex h-16 w-16 shrink-0 items-center justify-center border-4 border-black bg-white shadow-[3px_3px_0_#111]">

                                                    <span className="text-2xl font-black">
                                                        {String(day.day).padStart(2, "0")}
                                                    </span>

                                                </div>

                                                <div>

                                                    <p className="text-sm font-black tracking-[0.2em]">
                                                        DAY {day.day}
                                                    </p>

                                                    <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                                                        {day.activities[0] || `DAY ${day.day}`}
                                                    </h3>

                                                </div>

                                            </div>

                                            <div className="hidden border-4 border-black bg-white px-3 py-2 font-black sm:block">
                                                {day.activities.length} STOPS
                                            </div>

                                        </div>

                                    </div>


                                    {/* Activities */}

                                    <div className="p-5 md:p-6">

                                        <div className="relative">

                                            {/* Timeline line */}

                                            <div className="absolute bottom-4 left-[19px] top-4 w-1 bg-black" />


                                            <div className="space-y-5">

                                                {day.activities.map((activity, index) => (

                                                    <div
                                                        key={index}
                                                        className="relative flex items-start gap-4"
                                                    >

                                                        {/* Number */}

                                                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border-4 border-black bg-[#fffdf5] font-black shadow-[2px_2px_0_#111]">

                                                            {index + 1}

                                                        </div>


                                                        {/* Activity */}

                                                        <div className="min-w-0 flex-1 border-4 border-black bg-[#fffdf5] p-4 shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-1">

                                                            <p className="font-black leading-relaxed">
                                                                {activity}
                                                            </p>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>


                                        {/* Notes */}

                                        {day.notes && (

                                            <div className="mt-7 rotate-[-1deg] border-4 border-black bg-[#ffde59] p-4 shadow-[4px_4px_0_#111]">

                                                <div className="flex items-start gap-3">

                                                    <span className="text-xl">
                                                        💡
                                                    </span>

                                                    <div>

                                                        <p className="text-sm font-black tracking-[0.15em]">
                                                            TRAVEL NOTE
                                                        </p>

                                                        <p className="mt-1 font-bold leading-relaxed">
                                                            {day.notes}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                </article>

                            );

                        })}

                    </div>

                </section>


                {/* Accommodation */}

                <section className="mt-8 border-4 border-black bg-[#ff8ee8] p-6 shadow-[7px_7px_0_#111]">

                    <div className="flex items-center gap-3">

                        <div className="border-4 border-black bg-white p-3">
                            <Hotel size={25} strokeWidth={3} />
                        </div>

                        <h2 className="text-3xl font-black">
                            WHERE TO STAY
                        </h2>

                    </div>


                    <div className="mt-6 grid gap-5 md:grid-cols-2">

                        {trip.accommodation_options.map((hotel, index) => (

                            <div
                                key={index}
                                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0_#111]"
                            >

                                <h3 className="text-xl font-black">
                                    {hotel.name}
                                </h3>

                                <p className="mt-2 font-bold">
                                    📍 {hotel.location}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    <span className="border-2 border-black bg-[#ffde59] px-3 py-1 font-black">
                                        {hotel.price_per_night}/night
                                    </span>

                                    {hotel.rating && (
                                        <span className="border-2 border-black bg-[#c8b6ff] px-3 py-1 font-black">
                                            ★ {hotel.rating}
                                        </span>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* Transport */}

                <section className="mt-8 border-4 border-black bg-[#ffde59] p-6 shadow-[7px_7px_0_#111]">

                    <div className="flex items-center gap-3">

                        <div className="border-4 border-black bg-white p-3">
                            <Plane size={25} strokeWidth={3} />
                        </div>

                        <h2 className="text-3xl font-black">
                            GETTING AROUND
                        </h2>

                    </div>


                    <div className="mt-6 grid gap-5 md:grid-cols-2">

                        {trip.transport_options.map((transport, index) => (

                            <div
                                key={index}
                                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0_#111]"
                            >

                                <div className="flex items-center justify-between gap-3">

                                    <h3 className="text-xl font-black uppercase">
                                        {transport.mode}
                                    </h3>

                                    {transport.provider && (
                                        <span className="border-2 border-black px-2 py-1 text-sm font-black">
                                            {transport.provider}
                                        </span>
                                    )}

                                </div>


                                <div className="mt-4 space-y-2 font-bold">

                                    {transport.price && (
                                        <p>💰 {transport.price}</p>
                                    )}

                                    {transport.duration && (
                                        <p>⏱ {transport.duration}</p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* Draft plan */}

                {/* Draft Plan / Final Trip Plan */}

                <section className="mt-8 border-4 border-black bg-[#fffdf5] shadow-[8px_8px_0_#111]">

                    {/* Header */}
                    <div className="border-b-4 border-black bg-[#b9a7ff] p-6">

                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                            <div>

                                <div className="mb-3 inline-flex items-center gap-2 border-4 border-black bg-white px-3 py-2 font-black shadow-[3px_3px_0_#111]">
                                    <Sparkles size={18} strokeWidth={3} />
                                    FINAL AI PLAN
                                </div>

                                <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
                                    YOUR COMPLETE
                                    <br />
                                    TRIP PLAN
                                </h2>

                                <p className="mt-3 max-w-2xl text-base font-bold md:text-lg">
                                    Your research, itinerary, accommodation and transport
                                    recommendations brought together into one personalized plan.
                                </p>

                            </div>

                            <div className="hidden rotate-3 border-4 border-black bg-[#ffde59] px-6 py-5 text-center shadow-[5px_5px_0_#111] md:block">

                                <p className="text-sm font-black uppercase">
                                    Destination
                                </p>

                                <p className="mt-1 text-2xl font-black uppercase">
                                    {trip.destination}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Trip Snapshot */}

                    <div className="border-b-4 border-black p-6">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="border-4 border-black bg-[#8ed8ff] p-3">
                                <Compass size={24} strokeWidth={3} />
                            </div>

                            <div>
                                <h3 className="text-2xl font-black uppercase">
                                    TRIP SNAPSHOT
                                </h3>

                                <p className="font-bold text-neutral-600">
                                    The essentials at a glance.
                                </p>
                            </div>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            {/* Destination */}

                            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 flex items-center gap-2">

                                    <MapPin size={20} strokeWidth={3} />

                                    <span className="text-sm font-black uppercase">
                                        Destination
                                    </span>

                                </div>

                                <p className="text-xl font-black uppercase">
                                    {trip.destination}
                                </p>

                            </div>


                            {/* Dates */}

                            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 flex items-center gap-2">

                                    <CalendarDays size={20} strokeWidth={3} />

                                    <span className="text-sm font-black uppercase">
                                        Travel Dates
                                    </span>

                                </div>

                                <p className="text-base font-black">
                                    {trip.start_date}
                                </p>

                                <p className="text-sm font-bold text-neutral-500">
                                    TO
                                </p>

                                <p className="text-base font-black">
                                    {trip.end_date}
                                </p>

                            </div>


                            {/* Budget */}

                            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 flex items-center gap-2">

                                    <WalletCards size={20} strokeWidth={3} />

                                    <span className="text-sm font-black uppercase">
                                        Budget
                                    </span>

                                </div>

                                <p className="text-xl font-black">
                                    {trip.budget
                                        ? `₹${Number(trip.budget).toLocaleString("en-IN")}`
                                        : "FLEXIBLE"}
                                </p>

                            </div>


                            {/* Days */}

                            <div className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 flex items-center gap-2">

                                    <Clock3 size={20} strokeWidth={3} />

                                    <span className="text-sm font-black uppercase">
                                        Trip Length
                                    </span>

                                </div>

                                <p className="text-xl font-black">
                                    {trip.itinerary?.length || 0} DAYS
                                </p>

                            </div>

                        </div>


                        {/* Preferences */}

                        {trip.preferences?.length > 0 && (

                            <div className="mt-5">

                                <p className="mb-3 text-sm font-black uppercase">
                                    Your Travel Style
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {trip.preferences.map((preference) => (

                                        <span
                                            key={preference}
                                            className="border-3 border-black bg-[#ff6b6b] px-3 py-2 text-sm font-black shadow-[2px_2px_0_#111]"
                                        >
                                            {preference}
                                        </span>

                                    ))}

                                </div>

                            </div>

                        )}

                    </div>


                    {/* AI Recommendation */}

                    <div className="p-6">

                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="border-4 border-black bg-[#ffde59] p-3">
                                    <Sparkles size={24} strokeWidth={3} />
                                </div>

                                <div>

                                    <h3 className="text-2xl font-black uppercase">
                                        AI RECOMMENDATION
                                    </h3>

                                    <p className="font-bold text-neutral-600">
                                        Your complete travel strategy.
                                    </p>

                                </div>

                            </div>


                            <div className="w-fit border-4 border-black bg-[#8ed8ff] px-3 py-2 text-sm font-black shadow-[3px_3px_0_#111]">
                                GENERATED BY TRIPWISE AI
                            </div>

                        </div>


                        {/* Draft Plan Content */}

                        <div className="relative border-4 border-black bg-white p-6 shadow-[6px_6px_0_#111] md:p-8">

                            {/* Decorative corner */}

                            <div className="absolute right-4 top-4 hidden h-8 w-8 border-4 border-black bg-[#ff6b6b] sm:block" />

                            <div className="max-w-4xl">

                                <div className="mb-6 flex items-center gap-3 border-b-4 border-black pb-4">

                                    <div className="flex h-12 w-12 items-center justify-center border-4 border-black bg-[#b9a7ff] text-xl font-black">
                                        01
                                    </div>

                                    <div>

                                        <p className="text-sm font-black uppercase text-neutral-500">
                                            THE BIG PICTURE
                                        </p>

                                        <p className="text-xl font-black uppercase">
                                            YOUR PERSONALIZED PLAN
                                        </p>

                                    </div>

                                </div>


                                <div className="whitespace-pre-wrap text-base font-bold leading-8 text-neutral-800 md:text-lg md:leading-9">
                                    {trip.draft_plan}
                                </div>

                            </div>

                        </div>


                        {/* Plan Highlights */}

                        <div className="mt-6 grid gap-4 md:grid-cols-3">

                            <div className="border-4 border-black bg-[#ffde59] p-5 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 text-3xl">
                                    🗺️
                                </div>

                                <h4 className="text-xl font-black uppercase">
                                    {trip.itinerary?.length || 0} DAYS
                                </h4>

                                <p className="mt-1 font-bold">
                                    Planned day-by-day itinerary
                                </p>

                            </div>


                            <div className="border-4 border-black bg-[#8ed8ff] p-5 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 text-3xl">
                                    🏨
                                </div>

                                <h4 className="text-xl font-black uppercase">
                                    {trip.accommodation_options?.length || 0} STAYS
                                </h4>

                                <p className="mt-1 font-bold">
                                    Accommodation options selected
                                </p>

                            </div>


                            <div className="border-4 border-black bg-[#ff9f68] p-5 shadow-[4px_4px_0_#111]">

                                <div className="mb-3 text-3xl">
                                    🚆
                                </div>

                                <h4 className="text-xl font-black uppercase">
                                    {trip.transport_options?.length || 0} OPTIONS
                                </h4>

                                <p className="mt-1 font-bold">
                                    Transport choices considered
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* Review */}

                {!isCompleted ? (
                    <section className="mt-10 border-4 border-black bg-black p-6 text-white shadow-[8px_8px_0_#ffde59]">

                        <div className="flex items-start gap-4">

                            <MessageSquare
                                size={32}
                                strokeWidth={3}
                            />

                            <div>

                                <h2 className="text-3xl font-black">
                                    WHAT DO YOU THINK?
                                </h2>

                                <p className="mt-2 font-bold text-neutral-300">
                                    Approve the plan or tell our agents what you want changed.
                                </p>

                            </div>

                        </div>


                        {!showFeedback ? (

                            <div className="mt-6 flex flex-col gap-4 sm:flex-row">

                                <button
                                    onClick={handleApprove}
                                    disabled={reviewLoading}
                                    className="flex flex-1 items-center justify-center gap-2 border-4 border-white bg-[#8ed8ff] px-5 py-4 font-black text-black shadow-[5px_5px_0_#ffde59] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                                >
                                    <Check size={22} strokeWidth={4} />
                                    {reviewLoading ? "APPROVING..." : "APPROVE TRIP"}
                                </button>


                                <button
                                    onClick={() => setShowFeedback(true)}
                                    disabled={reviewLoading}
                                    className="flex-1 border-4 border-white bg-[#ff7777] px-5 py-4 font-black text-black shadow-[5px_5px_0_#ffde59] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                                >
                                    REQUEST CHANGES
                                </button>

                            </div>

                        ) : (

                            <div className="mt-6">

                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="What would you like us to change?"
                                    rows={5}
                                    className="w-full resize-none border-4 border-white bg-white p-4 font-bold text-black outline-none"
                                />


                                <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                                    <button
                                        onClick={handleRequestChanges}
                                        disabled={!feedback.trim() || reviewLoading}
                                        className="flex-1 border-4 border-white bg-[#ffde59] px-5 py-4 font-black text-black disabled:opacity-50"
                                    >
                                        {reviewLoading
                                            ? "UPDATING PLAN..."
                                            : "SEND FEEDBACK"}
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowFeedback(false);
                                            setFeedback("");
                                        }}
                                        className="border-4 border-white px-5 py-4 font-black transition hover:bg-white/10"
                                    >
                                        CANCEL
                                    </button>

                                </div>

                            </div>

                        )}

                    </section>
                ) : (

                    <section className="mt-10 border-4 border-black bg-[#8ed8ff] p-8 text-center shadow-[8px_8px_0_#111]">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center border-4 border-black bg-white">
                            <Check size={35} strokeWidth={4} />
                        </div>

                        <h2 className="mt-5 text-4xl font-black">
                            TRIP APPROVED!
                        </h2>

                        <p className="mt-2 font-bold">
                            Your travel plan is ready. Have an amazing trip!
                        </p>

                    </section>

                )}

            </main>

        </div>
    );
}

export default TripResults;