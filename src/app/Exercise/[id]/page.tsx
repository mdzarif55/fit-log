"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Workout } from "@/types/workout";

const ExerciseDetails = () => {
  const params = useParams();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const id = Number(params.id);

  // ================================
  // GET WORKOUT
  // ================================
  useEffect(() => {
    const getWorkout = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const workouts: Workout[] = await res.json();

        const selectedWorkout = workouts.find(
          (item) => item.id === id
        );

        setWorkout(selectedWorkout || null);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load workout");
      } finally {
        setLoading(false);
      }
    };

    getWorkout();
  }, [id]);

  // ================================
  // ADD TO PLAN
  // ================================
  const handleAddToPlan = () => {
    if (!workout) return;

    const plan: Workout[] = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    // Already exists
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      toast("Already added to today's plan", {
        icon: "✓",
      });

      return;
    }

    // Add workout
    const updatedPlan = [...plan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    // Tell Navbar to update
    window.dispatchEvent(
      new Event("fitlog-storage")
    );

    toast.success("Added to today's plan");
  };

  // ================================
  // SAVE FOR LATER
  // ================================
  const handleSave = () => {
    if (!workout) return;

    const saved: Workout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    // Already saved
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      toast("Already saved", {
        icon: "✓",
      });

      return;
    }

    // Save workout
    const updatedSaved = [...saved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    // Tell Navbar to update
    window.dispatchEvent(
      new Event("fitlog-storage")
    );

    toast.success("Saved for later");
  };

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
        <p className="text-sm text-[#777b85]">
          Loading workout...
        </p>
      </main>
    );
  }

  // ================================
  // NOT FOUND
  // ================================
  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-5">

        <div className="text-center">

          <h1 className="text-3xl font-bold uppercase text-white">
            Workout Not Found
          </h1>

          <p className="mt-3 text-sm text-[#777b85]">
            The workout you're looking for doesn't exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-[#b6ff00] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#c8ff33]"
          >
            Back to Library
          </Link>

        </div>

      </main>
    );
  }

  // ================================
  // PAGE
  // ================================
  return (
    <main className=" font-inter min-h-screen bg-[#0b0c0f] px-5 py-8 md:px-8 md:py-10">

      <div className="mx-auto max-w-[1200px]">

        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase text-[#777b85] transition hover:text-[#b6ff00]"
        >
          ← Back to library
        </Link>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">

          {/* =========================================
              LEFT IMAGE
          ========================================== */}
          <div className="relative aspect-[4/4.8] overflow-hidden rounded-xl border border-[#252830] bg-[#15171c] lg:aspect-auto lg:min-h-[550px]">

            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

          </div>

          {/* =========================================
              RIGHT CONTENT
          ========================================== */}
          <div className="flex flex-col justify-center">

            {/* Title */}
            <h1 className="text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[600px] text-[13px] leading-6 text-[#92959e]">
              {workout.description}
            </p>

            {/* Muscle Tags */}
            <div className="mt-4 flex flex-wrap gap-2">

              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#b6ff00] px-3 py-1 text-[9px] font-bold uppercase leading-none text-black"
                >
                  {muscle}
                </span>
              ))}

            </div>

            {/* =========================================
                INFORMATION BOX
            ========================================== */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#252830] bg-[#15171c]">

              {/* Equipment */}
              <div className="flex items-center justify-between border-b border-[#252830] px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Equipment
                </span>

                <span className="text-[11px] text-[#d5d7dc]">
                  {workout.equipment}
                </span>

              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between border-b border-[#252830] px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Difficulty
                </span>

                <span className="text-[11px] capitalize text-[#d5d7dc]">
                  {workout.difficulty}
                </span>

              </div>

              {/* Sets */}
              <div className="flex items-center justify-between border-b border-[#252830] px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Sets
                </span>

                <span className="text-[11px] text-[#d5d7dc]">
                  {workout.sets}
                </span>

              </div>

              {/* Reps */}
              <div className="flex items-center justify-between border-b border-[#252830] px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Reps
                </span>

                <span className="text-[11px] text-[#d5d7dc]">
                  {workout.reps}
                </span>

              </div>

              {/* Duration */}
              <div className="flex items-center justify-between border-b border-[#252830] px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Duration
                </span>

                <span className="text-[11px] text-[#d5d7dc]">
                  {workout.duration} min
                </span>

              </div>

              {/* Calories */}
              <div className="flex items-center justify-between border-b border-[#252830] px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Calories
                </span>

                <span className="text-[11px] text-[#d5d7dc]">
                  {workout.caloriesBurned} kcal
                </span>

              </div>

              {/* Rating */}
              <div className="flex items-center justify-between px-5 py-3.5">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                  Rating
                </span>

                <span className="text-[11px] text-[#d5d7dc]">
                  {workout.rating}
                </span>

              </div>

            </div>

            {/* =========================================
                INSTRUCTIONS
            ========================================== */}
            <section className="mt-7">

              <h2 className="text-[13px] font-bold uppercase text-white">
                Instructions
              </h2>

              <div className="mt-3 space-y-2.5">

                {workout.instructions.map(
                  (instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >

                      <span className="mt-[2px] text-[10px] text-[#777b85]">
                        {index + 1}.
                      </span>

                      <p className="text-[11px] leading-5 text-[#9a9da5]">
                        {instruction}
                      </p>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* =========================================
                ACTION BUTTONS
            ========================================== */}
            <div className="mt-7 flex flex-wrap gap-3">

              {/* ADD TO PLAN */}
              <button
                onClick={handleAddToPlan}
                className="flex items-center gap-2 rounded-md bg-[#b6ff00] px-5 py-3 text-[11px] font-bold text-black transition hover:bg-[#c8ff33]"
              >
                <span></span>
                Add to today's plan
              </button>

              {/* SAVE */}
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-md border border-[#30343d] px-5 py-3 text-[11px] font-bold text-[#d0d2d8] transition hover:border-[#777b85] hover:text-white"
              >
                <span></span>
                Save for later
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ExerciseDetails;