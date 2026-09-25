"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Workout } from "@/app/types/workout";

const MyPlan = () => {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [completed, setCompleted] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const loadData = () => {
      const storedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const storedSaved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      const storedCompleted = JSON.parse(
        localStorage.getItem("fitlog-completed") || "[]"
      );

      setPlan(storedPlan);
      setSaved(storedSaved);
      setCompleted(storedCompleted);
    };

    loadData();

    window.addEventListener("fitlog-storage", loadData);

    return () => {
      window.removeEventListener("fitlog-storage", loadData);
    };
  }, []);

  const workouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [workouts, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const removeWorkout = (id: number) => {
    if (activeTab === "plan") {
      const updatedPlan = plan.filter((workout) => workout.id !== id);

      setPlan(updatedPlan);
      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );
    } else {
      const updatedSaved = saved.filter((workout) => workout.id !== id);

      setSaved(updatedSaved);
      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );
    }

    window.dispatchEvent(new Event("fitlog-storage"));
  };

  const markAsDone = (id: number) => {
    if (completed.includes(id)) return;

    const updatedCompleted = [...completed, id];

    setCompleted(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompleted)
    );
  };

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="font-oswald text-3xl font-bold uppercase text-white">
          My Plan
        </h1>

        <p className="font-inter mt-1 text-[11px] text-[#777b85]">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-xl border border-[#252830] bg-[#12151a] sm:grid-cols-3">
          <div className="border-b border-[#20232a] px-5 py-5 sm:border-b-0 sm:border-r">
            <p className="font-inter text-[10px] text-[#858993]">
              Exercises
            </p>

            <p className="font-oswald mt-1 text-3xl font-bold text-[#b6ff00]">
              {plan.length}
            </p>
          </div>

          <div className="border-b border-[#20232a] px-5 py-5 sm:border-b-0 sm:border-r">
            <p className="font-inter text-[10px] text-[#858993]">
              Minutes
            </p>

            <p className="font-oswald mt-1 text-3xl font-bold text-white">
              {totalMinutes}
            </p>
          </div>

          <div className="px-5 py-5">
            <p className="font-inter text-[10px] text-[#858993]">
              Calories
            </p>

            <p className="font-oswald mt-1 text-3xl font-bold text-white">
              {totalCalories}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex overflow-hidden rounded-lg border border-[#252830] bg-[#15171c] p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded-md px-4 py-2 font-inter text-[10px] transition ${
                activeTab === "plan"
                  ? "bg-[#20242b] text-white"
                  : "text-[#777b85] hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-2 font-inter text-[10px] transition ${
                activeTab === "saved"
                  ? "bg-[#20242b] text-white"
                  : "text-[#777b85] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-[#252830] bg-[#15171c] px-3 py-2 font-inter text-[10px] text-[#bfc1c7] outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="mt-4 space-y-3">
          {sortedWorkouts.length === 0 ? (
            <div className="rounded-xl border border-[#252830] bg-[#12151a] px-5 py-12 text-center">
              <p className="font-oswald text-xl uppercase text-white">
                {activeTab === "plan"
                  ? "No workouts in today's plan"
                  : "No saved workouts"}
              </p>

              <p className="font-inter mt-2 text-xs text-[#777b85]">
                {activeTab === "plan"
                  ? "Add workouts from the library."
                  : "Save workouts to find them here later."}
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex rounded-md bg-[#b6ff00] px-5 py-3 font-inter text-[10px] font-bold uppercase text-black"
              >
                Browse Workouts
              </Link>
            </div>
          ) : (
            sortedWorkouts.map((workout) => {
              const isDone = completed.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#252830] bg-[#12151a] p-3 transition hover:border-[#343842] sm:flex-row sm:items-center"
                >
                  <div className="relative h-[75px] w-full shrink-0 overflow-hidden rounded-lg sm:w-[110px]">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                      sizes="110px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-oswald text-[16px] font-bold uppercase text-white">
                      {workout.name}
                    </h2>

                    <p className="font-inter text-[12px] text-[#858993]">
                      {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 font-inter text-[12px] text-[#b6ff00]">
                      <span>◷ {workout.duration} min</span>
                      <span>♨ {workout.caloriesBurned} kcal</span>
                      <span>★ {workout.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/Exercise/${workout.id}`}
                      className="rounded-full border border-[#30343d] px-4 py-2 font-inter text-[12px] text-[#d0d2d8] transition hover:border-[#777b85] hover:text-white"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => markAsDone(workout.id)}
                        className="rounded-full bg-[#b6ff00] px-4 py-2 font-inter text-[12px] font-bold text-black"
                      >
                        ✓ {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => removeWorkout(workout.id)}
                      className="px-2 py-2 font-inter text-sm text-[#777b85] transition hover:text-white"
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPlan;