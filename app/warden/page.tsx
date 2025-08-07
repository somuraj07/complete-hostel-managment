"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

type Student = {
  id: string;
  name: string;
  registerNo: string;
  roomNumber: string;
  reason: string;
  village: string;
  phoneNumber: string;
  photo: string;
  approvedBy: string | null;
  submit: boolean;
  returned: boolean;
  comeoutTime: string;
  comeinTime: string;
  createdAt: string;
  updatedAt: string;
  days: string;
};

type TokenPayload = {
  person: string;
};

export default function WardenPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Student[]>([]);
  const [selectedWarden, setSelectedWarden] = useState<Record<string, string>>({});
  const [wardenName, setWardenName] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  // 👇 Refs for each student row
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const alldetailshandler = () => router.push("/allDetails");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      const data: Student[] = res.data;
      setStudents(data);
      const newApplications = data.filter((s) => !s.submit);
      setNotifications(newApplications);

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: TokenPayload = jwtDecode(token);
          setWardenName(decoded.person);
          const updated: Record<string, string> = {};
          data.forEach((s) => {
            updated[s.id] = decoded.person;
          });
          setSelectedWarden(updated);
        } catch (err) {
          toast.error("Invalid token");
        }
      }
    } catch (err) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (id: string) => {
    try {
      await axios.put(`/api/students/${id}`, {
        submit: true,
        approvedBy: wardenName || "Warden",
      });
      toast.success("Submitted successfully");
      fetchStudents();
    } catch (err) {
      toast.error("Failed to submit");
    }
  };

  // 👇 Scroll to student row
  const scrollToRow = (id: string) => {
    const row = rowRefs.current[id];
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      row.classList.add("bg-yellow-100");
      setTimeout(() => row.classList.remove("bg-yellow-100"), 2000); // highlight for 2s
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-600">Warden Dashboard</h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative text-orange-600 hover:text-orange-800"
        >
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      <button
        onClick={alldetailshandler}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        View All Details
      </button>

      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <div className="overflow-x-auto border border-orange-300 rounded-lg">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-orange-100 text-orange-600">
              <tr>
                <th className="px-6 py-3">Photo</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Register No</th>
                <th className="px-6 py-3">Room No</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Village</th>
                <th className="px-6 py-3">Reason</th>
                <th className="px-6 py-3">Days</th>
                <th className="px-6 py-3">Approved By</th>
                <th className="px-6 py-3">Submit</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  ref={(el) => {
                    rowRefs.current[student.id] = el;
                  }}
                  
                  className="bg-white border-b hover:bg-orange-50 transition"
                >
                  <td className="px-6 py-4">
                    <img
                      src={student.photo}
                      alt="photo"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.registerNo}</td>
                  <td className="px-6 py-4">{student.roomNumber}</td>
                  <td className="px-6 py-4">{student.phoneNumber}</td>
                  <td className="px-6 py-4">{student.village}</td>
                  <td className="px-6 py-4">{student.reason}</td>
                  <td className="px-6 py-4">{student.days}</td>
                  
                  <td className="px-6 py-4">
                    {student.approvedBy ?? (
                      <span className="text-red-500">Not submitted</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {student.submit ? (
                      <span className="text-green-600 font-semibold">Submitted</span>
                    ) : (
                      <button
                        onClick={() => handleSubmit(student.id)}
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
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
      )}

      {/* Slide-in Notification Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-1/2 h-full bg-white shadow-lg border-l z-50 p-6 overflow-y-auto transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-orange-600">Notifications</h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="text-gray-600">No new notifications</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((student) => (
                <li
                  key={student.id}
                  onClick={() => scrollToRow(student.id)}
                  className="p-4 border border-orange-200 rounded-lg shadow-sm bg-orange-50 cursor-pointer hover:bg-orange-100"
                >
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-700">Reg No: {student.registerNo}</p>
                  <p className="text-sm text-gray-700">Reason: {student.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
