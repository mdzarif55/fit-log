"use client";

import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";
  const isPlanActive = pathname === "/plan";
  const isSavedActive = pathname === "/saved";

  // Read counts from localStorage
  const updateCounts = () => {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
    // Initial count
    updateCounts();

    // Update when workout is added/saved
    window.addEventListener(
      "fitlog-storage",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage",
        updateCounts
      );
    };
  }, []);

  return (
    <nav className="h-[76px] border-b border-[#202228] bg-[#0b0c0f] px-5 md:px-8 sticky top-0 z-50">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="Logo" />

          <span className="text-[19px] font-bold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">

          {/* Workouts */}
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-[14px] font-bold transition ${
              isWorkoutsActive
                ? "bg-[#17220d] text-[#b6ff00]"
                : "text-[#9b9da5] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-[14px] font-bold transition ${
              isMyPlanActive
                ? "bg-[#17220d] text-[#b6ff00]"
                : "text-[#9b9da5] hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 text-[14px]">

          {/* Plan */}
          <Link
            href="/my-plan"
            className={`flex items-center gap-2 transition ${
              isPlanActive
                ? "text-white"
                : "text-[#b2b3ba] hover:text-white"
            }`}
          >
            <span>Plan</span>

            <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#b6ff00] px-1 text-[11px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className={`flex items-center gap-2 transition ${
              isSavedActive
                ? "text-white"
                : "text-[#8f9199] hover:text-white"
            }`}
          >
            <span>Saved</span>

            <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full border border-[#30333b] px-1 text-[11px] text-[#a5a7ae]">
              {savedCount}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;