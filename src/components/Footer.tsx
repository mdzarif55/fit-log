import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-[#202228] bg-[#0b0c0f] px-5 py-6">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog logo"
            
          />

          <span className="font-oswald text-[19px] font-bold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <p className="font-inter text-center text-[12px] text-[#6B7280] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;