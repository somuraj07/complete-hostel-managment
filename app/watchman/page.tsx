"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Student {
  id: string;
  name: string;
  registerNo: string;
  submit: boolean;
  returned: boolean;
  comeoutTime: string | null;
  comeinTime: string | null;
  photo: string; // From Prisma
}

export default function WatchmanPage() {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      const filtered = response.data.filter(
        (student: Student) => student.submit && !student.returned
      );
      setStudents(filtered);
    } catch (error) {
      toast.error("Failed to fetch students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOut = async (id: string) => {
    try {
      await axios.patch(`/api/students/${id}`, {
        comeoutTime: new Date(),
      });
      toast.success("Come Out Time marked");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to mark Come Out Time");
    }
  };

  const handleReturn = async (id: string) => {
    try {
      await axios.patch(`/api/students/${id}`, {
        comeinTime: new Date(),
        returned: true,
      });
      toast.success("Student Returned");
      fetchStudents();
    } catch (error) {
      toast.error("Failed to mark return");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-100 py-6 px-4 text-black">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#9a3310]">
        Watchman Panel
      </h1>

      <div className="space-y-4 max-w-md mx-auto">
        {students.length === 0 && (
          <p className="text-center text-gray-600">No students to display</p>
        )}

        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4"
          >
            {/* Photo on left */}
            <img
              src={student.photo || "/default-profile.png"}
              alt={student.name}
              className="w-20 h-20 rounded-full object-cover border border-gray-300"
            />

            {/* Info and Buttons in row */}
            <div className="flex flex-col flex-1">
              <div className="mb-2">
                <p className="text-lg font-semibold text-[#872e0e]">{student.name}</p>
                <p className="text-gray-600 text-sm">{student.registerNo}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOut(student.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded text-sm"
                >
                  Out
                </button>
                <button
                  onClick={() => handleReturn(student.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
