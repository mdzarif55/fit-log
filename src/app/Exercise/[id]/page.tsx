"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Workout } from "@/app/types/workout";

const ExerciseDetails = () => {
  const params = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const id = Number(params.id);

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
        const selectedWorkout = workouts.find((item) => item.id === id);

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

  const handleAddToPlan = () => {
    if (!workout) return;

    const plan: Workout[] = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    if (plan.some((item) => item.id === workout.id)) {
      toast("Already added to today's plan", { icon: "✓" });
      return;
    }

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify([...plan, workout])
    );

    window.dispatchEvent(new Event("fitlog-storage"));
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (!workout) return;

    const saved: Workout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved", { icon: "✓" });
      return;
    }

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify([...saved, workout])
    );

    window.dispatchEvent(new Event("fitlog-storage"));
    toast.success("Saved for later");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f]">
        <p className="text-sm text-[#777b85]">Loading workout...</p>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-5">
        <div className="text-center">
          <h1 className="font-oswald text-3xl font-bold uppercase text-white">
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

  return (
    <main className="font-inter min-h-screen bg-[#0b0c0f] px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase text-[#777b85] transition hover:text-[#b6ff00]"
        >
          ← Back to library
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
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

          <div className="flex flex-col justify-center">
            <h1 className="font-oswald text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-4 max-w-[600px] text-[13px] leading-6 text-[#92959e]">
              {workout.description}
            </p>

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

            <div className="mt-5 overflow-hidden rounded-xl border border-[#252830] bg-[#15171c]">
              {[
                ["Equipment", workout.equipment],
                ["Difficulty", workout.difficulty],
                ["Sets", workout.sets],
                ["Reps", workout.reps],
                ["Duration", `${workout.duration} min`],
                ["Calories", `${workout.caloriesBurned} kcal`],
                ["Rating", workout.rating],
              ].map(([label, value], index, array) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    index !== array.length - 1
                      ? "border-b border-[#252830]"
                      : ""
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-wide text-[#858993]">
                    {label}
                  </span>

                  <span className="text-[11px] capitalize text-[#d5d7dc]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <section className="mt-7">
              <h2 className="font-oswald text-[13px] font-bold uppercase text-white">
                Instructions
              </h2>

              <div className="mt-3 space-y-2.5">
                {workout.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="mt-[2px] text-[10px] text-[#777b85]">
                      {index + 1}.
                    </span>

                    <p className="text-[11px] leading-5 text-[#9a9da5]">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={handleAddToPlan}
                className="flex items-center gap-2 rounded-md bg-[#b6ff00] px-5 py-3 text-[11px] font-bold text-black transition hover:bg-[#c8ff33]"
              >
                Add to today's plan
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-md border border-[#30343d] px-5 py-3 text-[11px] font-bold text-[#d0d2d8] transition hover:border-[#777b85] hover:text-white"
              >
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