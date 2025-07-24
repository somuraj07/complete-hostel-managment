"use client";
import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  registerNo: string;
  roomNumber: string;
  reason: string;
  village: string;
  phoneNumber: string;
  days: string;
  submit: boolean;
  returned: boolean;
  approvedBy: string;
  comeoutTime: string;
  comeinTime: string;
}

export default function AllDetailsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
  
        console.log(" API Response:", data);
  
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error(" Not an array:", data);
          setStudents([]);
        }
      } catch (err) {
        console.error(" Fetch failed", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    }
  
    fetchStudents();
  }, []);
  
  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">All Student Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Room No</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Village</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Days</th>
              <th className="px-4 py-2">Submit</th>
              <th className="px-4 py-2">Returned</th>
              <th className="px-4 py-2">Approved By</th>
              <th className="px-4 py-2">Come Out</th>
              <th className="px-4 py-2">Come In</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.registerNo}</td>
                <td className="px-4 py-2">{student.roomNumber}</td>
                <td className="px-4 py-2">{student.reason}</td>
                <td className="px-4 py-2">{student.village}</td>
                <td className="px-4 py-2">{student.phoneNumber}</td>
                <td className="px-4 py-2">{student.days}</td>
                <td className="px-4 py-2">
                  {student.submit ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2">
                  {student.returned ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2">{student.approvedBy}</td>
                <td className="px-4 py-2">
                  {new Date(student.comeoutTime).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(student.comeinTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
