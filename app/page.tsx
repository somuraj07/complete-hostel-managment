"use client"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const studentHandler = ()=>{
    router.push('/api/students/new')
  }
  const wardenHandler = ()=>{
    router.push('/login')
  }
  const watchmenHandler = ()=>{
    router.push('/login')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Login Portal</h2>
      
      <div className="flex flex-col gap-4 text-lg">
        <button
          onClick={studentHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Student Login
        </button>
        
        <button
          onClick={wardenHandler}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Warden Login
        </button>
        
        <button
          onClick={watchmenHandler}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Watchman Login
        </button>
      </div>
    </div>
  </div>
  
  );
}
