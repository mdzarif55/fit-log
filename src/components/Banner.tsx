import Image from "next/image";
import Link from "next/link";
import Baner from '@/assets/banner.png'
const Banner = () => {
  return (
    <section className="px-5 py-12 md:px-8">
      <div className="mx-auto flex min-h-[430px] max-w-[1400px] items-center overflow-hidden rounded-2xl border border-[#252830] bg-[#15171c]">

        {/* Left Content */}
        <div className="w-full px-8 py-12 md:w-[58%] md:px-14">

          <p className="mb-6 text-[12px] font-bold tracking-[1.5px] text-[#b6ff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-[650px] text-5xl font-black leading-[0.95] tracking-[-2px] text-white md:text-6xl lg:text-[64px]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-[540px] text-[16px] leading-6 text-[#9699a3]">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link
            href="/#exercise"
            className="mt-7 inline-flex items-center rounded-md bg-[#b6ff00] px-6 py-3.5 text-[12px] font-extrabold uppercase text-black transition hover:bg-[#c5ff33]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative hidden h-[430px] flex-1 md:block">

          <Image
            src={Baner}
            alt="Workout exercise"
            fill
            priority
            className="object-contain object-center"
          />

        </div>
      </div>
    </section>
  );
};

export default Banner;