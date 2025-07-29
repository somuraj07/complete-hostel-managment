"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#fdba74] to-[#fb923c] shadow-md h-16">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-start">
        <button
          onClick={goHome}
          className="flex items-center hover:opacity-90 transition"
        >
          <Image
            src="/LOGO-02.png"
            alt="SGI Logo"
            width={160}
            height={60}
            className="object-contain"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
