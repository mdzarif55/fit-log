import Link from "next/link";
import Logo from '@/assets/logo.png'
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="h-[76px] border-b border-[#202228] bg-[#0b0c0f] px-5 md:px-8">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="Logo"/>

          <span className="text-[19px] font-bold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          <Link
            href="/workouts"
            className="rounded-full bg-[#17220d] px-5 py-2 text-[12px] font-bold text-[#b6ff00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-5 py-2 text-[12px] font-medium text-[#9b9da5] transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-5 text-[12px]">

          {/* Plan */}
          <Link href={"/plan"} className="flex items-center gap-2 text-[#b2b3ba]">
            <span>Plan</span>

            <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#b6ff00] px-1 text-[11px] font-bold text-black">
              0
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/saved"
            className="flex items-center gap-2 text-[#8f9199] transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full border border-[#30333b] px-1 text-[11px] text-[#a5a7ae]">
              0
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;