"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function WardenPage() {
  const [students, setStudents] = useState([]);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Warden Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th>Name</th>
            <th>Register No</th>
            <th>Room No</th>
            <th>Reason</th>
            <th>Phone</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s: any) => (
            <tr key={s.id} className="border-b">
              <td>{s.name}</td>
              <td>{s.registerNo}</td>
              <td>{s.roomNumber}</td>
              <td>{s.reason}</td>
              <td>{s.phoneNumber}</td>
              <td>
                {s.submit ? (
                  <span className="text-green-600 font-semibold">Submitted</span>
                ) : (
                  <button
                    onClick={() => handleSubmit(s.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
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
  );
}
