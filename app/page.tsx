"use client";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldCheck, LocateIcon, Settings } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const studentHandler = () => router.push("/api/students/new");
  const wardenHandler = () => router.push("/admin/login");
  const watchmenHandler = () => router.push("/admin/login");
  const AdminHandler = () => router.push("/allDetails");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4c1d0d] to-white p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
            <div className="bg-blue-500 rounded-full p-4 shadow-md">
            <GraduationCap size={32} className="text-white" />
            </div>
        </div>

        <h2 className="text-3xl font-bold text-[#4c1d0d] mb-1">Outpass Portal</h2>
        <p className="text-gray-700 text-sm mb-6">Choose your role to continue</p>

        <div className="flex flex-col gap-4">
          {/* Student Portal */}
          <button
            onClick={studentHandler}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-4 flex flex-col items-center justify-center w-full shadow-md transition"
          >
            <GraduationCap size={24} />
            <p className="font-bold mt-2">Student Portal</p>
            <p className="text-xs font-light">Submit outpass requests</p>
          </button>

          {/* Warden Portal */}
          <button
            onClick={wardenHandler}
            className="bg-[#4c1d0d] hover:bg-[#3a1507] text-white rounded-xl px-4 py-4 flex flex-col items-center justify-center w-full shadow-md transition"
          >
            <ShieldCheck size={24} />
            <p className="font-bold mt-2">Warden Portal</p>
            <p className="text-xs font-light">Approve outpass requests</p>
          </button>

          {/* Watchman Portal */}
          <button
            onClick={watchmenHandler}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl px-4 py-4 flex flex-col items-center justify-center w-full shadow-md transition"
          >
            <LocateIcon size={24} />
            <p className="font-bold mt-2">Watchman Portal</p>
            <p className="text-xs font-light">Track student movements</p>
          </button>

          {/* Admin Portal */}
          <button
            onClick={AdminHandler}
            className="bg-[#4b5d72] hover:bg-[#3a4958] text-white rounded-xl px-4 py-4 flex flex-col items-center justify-center w-full shadow-md transition"
          >
            <Settings size={24} />
            <p className="font-bold mt-2">Admin Portal</p>
            <p className="text-xs font-light">View all records</p>
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">Secure outpass management system</p>
      </div>
    </div>
  );
}
