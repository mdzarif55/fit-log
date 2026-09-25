import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/app/types/workout";

const Exercise = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts: Workout[] = await res.json();

  return (
    <section className="px-5 py-10 md:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold uppercase leading-none text-white">
            The Library
          </h2>

          <p className="mt-1 text-[12px] text-[#777b85]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/Exercise/${workout.id}`}
              className="group block overflow-hidden rounded-lg border border-[#24272e] bg-[#15171c] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#b6ff00] hover:bg-[#191c20] hover:shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
            >
              {/* Image */}
              <div className="relative aspect-[2/1] w-full overflow-hidden">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-3.5">

                {/* Tags */}
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#b6ff00] px-2 py-[3px] text-[8px] font-bold uppercase leading-none text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="text-[14px] font-bold uppercase leading-tight text-white transition-colors duration-300 group-hover:text-[#b6ff00]">
                  {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-1 text-[9px] text-[#777b85]">
                  {workout.equipment}
                </p>

                {/* Divider */}
                <div className="my-3 border-t border-[#252830]" />

                {/* Stats */}
                <div className="flex items-center gap-3 text-[9px] text-[#858993]">
                  <span>◷ {workout.duration} min</span>
                  <span>♥ {workout.caloriesBurned} kcal</span>
                  <span>★ {workout.rating}</span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exercise;