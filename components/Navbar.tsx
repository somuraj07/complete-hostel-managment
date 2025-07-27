"use client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f9843d] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
        <button
          onClick={goHome}
          className="text-2xl font-bold text-white hover:opacity-90 transition"
        >
          SGI-Hostels
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
