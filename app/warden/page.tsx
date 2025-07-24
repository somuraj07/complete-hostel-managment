"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function WardenPage() {
  const [students, setStudents] = useState([]);
  const router = useRouter();
  const detailsHandler = ()=>{
   router.push('/allDetails')
  }

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (id: string) => {
    try {
      await axios.put(`/api/students/${id}`, { submit: true });
      toast.success("Permission Submitted");
      fetchStudents(); // refresh list
    } catch (err) {
      toast.error("Submit failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-[#872e0e]">Warden Dashboard</h1>
    <button
      onClick={detailsHandler}
      className="bg-[#872e0e] hover:bg-[#9a3310] text-white font-medium px-4 py-2 rounded-md shadow transition duration-300"
    >
      All Details
    </button>
  </div>

  <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
    <table className="min-w-full bg-white text-sm text-gray-800">
      <thead className="bg-[#f7f3f2] text-[#872e0e] text-left font-semibold">
        <tr>
          <th className="px-4 py-3 border-b">Name</th>
          <th className="px-4 py-3 border-b">Register No</th>
          <th className="px-4 py-3 border-b">Room No</th>
          <th className="px-4 py-3 border-b">Reason</th>
          <th className="px-4 py-3 border-b">Phone</th>
          <th className="px-4 py-3 border-b text-center">Submit</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s: any) => (
          <tr key={s.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-3">{s.name}</td>
            <td className="px-4 py-3">{s.registerNo}</td>
            <td className="px-4 py-3">{s.roomNumber}</td>
            <td className="px-4 py-3">{s.reason}</td>
            <td className="px-4 py-3">{s.phoneNumber}</td>
            <td className="px-4 py-3 text-center">
              {s.submit ? (
                <span className="text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                  Submitted
                </span>
              ) : (
                <button
                  onClick={() => handleSubmit(s.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium shadow-sm transition"
                >
                  Submit
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
