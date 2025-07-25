"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Bell } from "lucide-react";

type Student = {
  id: string;
  name: string;
  registerNo: string;
  roomNumber: string;
  reason: string;
  phoneNumber: string;
  submit: boolean;
};

export default function WardenPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [notifications, setNotifications] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [slideOpen, setSlideOpen] = useState(false);
  const router = useRouter();
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  const detailsHandler = () => {
    router.push("/allDetails");
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      const data: Student[] = res.data;
      setStudents(data);
      const newApplications = data.filter((s) => !s.submit);
      setNotifications(newApplications);
    } catch (err) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const showBrowserNotification = (message: string, studentId: string) => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "granted") {
      const n = new Notification("New Application", {
        body: message,
        icon: "/notification-icon.png",
      });
      n.onclick = () => {
        window.focus?.();
        jumpToStudent(studentId);
      };
    }
  };

  useEffect(() => {
    fetchStudents();
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("/api/students");
        const data: Student[] = res.data;
        const previousUnsubmitted = notifications.map((n) => n.id);
        const currentUnsubmitted = data.filter((s) => !s.submit);
        currentUnsubmitted
          .filter((s) => !previousUnsubmitted.includes(s.id))
          .forEach((s) =>
            showBrowserNotification(`${s.name} requested permission`, s.id)
          );
        setStudents(data);
        setNotifications(currentUnsubmitted);
      } catch (err) {
        console.error("Polling failed", err);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (id: string) => {
    try {
      await axios.put(`/api/students/${id}`, { submit: true });
      toast.success("Permission Submitted");
      fetchStudents();
    } catch (err) {
      toast.error("Submit failed");
    }
  };

  const jumpToStudent = (id: string) => {
    setHighlightedId(id);
    const row = document.getElementById(`row-${id}`);
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setHighlightedId(null), 4000);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#872e0e]">Warden Dashboard</h1>
        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setSlideOpen(!slideOpen)}
            className="relative text-white bg-red-600 hover:bg-red-700 p-2 rounded-full shadow"
          >
            <Bell className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold px-2 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>
          <button
            onClick={detailsHandler}
            className="bg-[#872e0e] hover:bg-[#9a3310] text-white font-medium px-4 py-2 rounded-md shadow"
          >
            All Details
          </button>
        </div>
      </div>

      {slideOpen && (
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-40 border-l p-4 overflow-y-auto mt-16">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">New Applications</h2>
            <button onClick={() => setSlideOpen(false)} className="text-sm">Close</button>
          </div>
          {notifications.length > 0 ? (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    jumpToStudent(n.id);
                    setSlideOpen(false);
                  }}
                >
                  <p className="font-medium">{n.name}</p>
                  <p className="text-xs text-gray-600">Reg: {n.registerNo}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No new applications</p>
          )}
        </div>
      )}

      <div
        ref={tableRef}
        className="overflow-x-auto rounded-lg shadow border border-gray-200 mt-4"
      >
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
            {students.map((s) => (
              <tr
                key={s.id}
                id={`row-${s.id}`}
                className={clsx(
                  "border-b hover:bg-gray-50 transition-colors",
                  highlightedId === s.id && "bg-yellow-100"
                )}
              >
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
                      className="bg-red-600 hover:bg-green-600 text-white px-4 py-1.5 rounded-md font-medium shadow-sm"
                    >
                       Submit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6 italic">
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}