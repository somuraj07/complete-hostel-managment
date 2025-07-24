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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#9a3310]">
        Watchman Panel
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {students.length === 0 && (
          <p className="text-center text-gray-500">No students to display</p>
        )}

        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-[#872e0e]">{student.name}</p>
              <p className="text-gray-600 text-sm">{student.registerNo}</p>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => handleOut(student.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Out
              </button>
              <button
                onClick={() => handleReturn(student.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Return
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
