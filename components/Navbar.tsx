"use client"
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const homeButton = () => {
    router.push('/');
  };

  

  return (
    <nav className="sticky top-0 z-50 bg-[#9a3310] bg-gradient-to-br from-[#872e0e] to-[#9a3310] text-white shadow-md py-4 px-6 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <button onClick={homeButton} className="text-2xl font-bold text-white">
          SGI-Hostels
        </button>
      </div>
    </nav>
  );
};

export default Navbar;