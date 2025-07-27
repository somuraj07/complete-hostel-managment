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
  photo: string;
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

  if (loading) return <div className="p-6 text-center text-black">Loading…</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9843d] flex flex-col items-center p-4 pt-6 text-black">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-black">Warden Dashboard</h1>
        <div className="flex items-center gap-2">
          {/* Red Notification Button */}
          <button
            onClick={() => setSlideOpen(!slideOpen)}
            className="relative text-white bg-red-600 hover:bg-red-700 p-2 rounded-full"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold px-1.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Green All Details Button */}
          <button
            onClick={detailsHandler}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-3 py-1.5 rounded-md"
          >
            All Details
          </button>
        </div>
      </div>

      {/* Notification Slide Panel */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-72 bg-white text-black z-50 shadow-lg transition-transform duration-300 border-l border-gray-200",
          slideOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-md font-semibold text-red-600">Notifications</h2>
          <button
            onClick={() => setSlideOpen(false)}
            className="text-sm text-gray-600"
          >
            Close
          </button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 bg-red-50 rounded shadow-sm hover:bg-red-100 cursor-pointer"
                onClick={() => {
                  jumpToStudent(n.id);
                  setSlideOpen(false);
                }}
              >
                <p className="font-medium">{n.name}</p>
                <p className="text-xs text-gray-700">Reg: {n.registerNo}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No new applications</p>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto mt-2">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden text-black">
          <thead className="bg-[#f9843d] text-white">
            <tr>
              <th className="px-3 py-2">Photo</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Reg No</th>
              <th className="px-3 py-2">Room</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Submit</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr
                key={s.id}
                id={`row-${s.id}`}
                className={clsx(
                  "text-center",
                  i % 2 === 0 ? "bg-white" : "bg-gray-50",
                  highlightedId === s.id && "bg-yellow-100"
                )}
              >
                <td className="py-2">
                  {s.photo ? (
                    <img
                      src={s.photo}
                      className="w-10 h-10 rounded-full object-cover border"
                      alt={s.name}
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Photo</span>
                  )}
                </td>
                <td className="px-2 py-2">{s.name}</td>
                <td className="px-2 py-2">{s.registerNo}</td>
                <td className="px-2 py-2">{s.roomNumber}</td>
                <td className="px-2 py-2">{s.reason}</td>
                <td className="px-2 py-2">{s.phoneNumber}</td>
                <td className="px-2 py-2">
                  {s.submit ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSubmit(s.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Submit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6 italic">
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
