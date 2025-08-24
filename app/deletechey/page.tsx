"use client";
import { useEffect, useState } from "react";

interface Student {
  id: string;
  name: string;
  registerNo: string;
  roomNumber: string;
  reason: string;
  village: string;
  days: string;
  submit: boolean;
  returned: boolean;
  approvedBy: string;
  comeoutTime: string;
  comeinTime: string;
  photo: string;
}

export default function DetailsAll() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // selection
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        if (Array.isArray(data)) {
          setStudents(data);
          setFilteredStudents(data);
        } else {
          setStudents([]);
          setFilteredStudents([]);
        }
      } catch (err) {
        console.error("Fetch failed", err);
        setStudents([]);
        setFilteredStudents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  // date filter
  const handleDateFilter = () => {
    if (!startDate && !endDate) {
      setFilteredStudents(students);
      return;
    }

    const filtered = students.filter((student) => {
      const studentDate = new Date(student.comeoutTime);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;
      if (from && studentDate < from) return false;
      if (to && studentDate > to) return false;
      return true;
    });

    setFilteredStudents(filtered);
  };

  // search filter
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.registerNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  // selection
  const handleSelectStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
    setSelectAll(!selectAll);
  };

  // delete
  const handleDeleteSelected = async () => {
    if (selectedStudents.length === 0) {
      alert("No students selected!");
      return;
    }
    if (!confirm("Are you sure you want to delete selected students?")) return;

    try {
      await fetch("/api/students/delete-many", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedStudents }),
      });

      const updated = students.filter((s) => !selectedStudents.includes(s.id));
      setStudents(updated);
      setFilteredStudents(updated);
      setSelectedStudents([]);
      setSelectAll(false);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        {/* Dates */}
        <div className="flex flex-col sm:flex-row gap-2 items-center w-full md:w-auto">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 border rounded text-black w-full sm:w-auto"
          />
            <span className="text-gray-700 font-medium">to</span>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 border rounded text-black w-full sm:w-auto"
          />
          <button
            onClick={handleDateFilter}
            className="bg-blue-600 text-white px-3 py-1 rounded w-full sm:w-auto"
          >
            Filter
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Reg No..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded text-black w-full md:flex-1"
        />

        {/* Delete */}
        <button
          onClick={handleDeleteSelected}
          className="bg-red-600 text-white px-4 py-2 rounded w-full md:w-auto"
        >
          Delete Selected
        </button>
      </div>

      <h1 className="text-xl font-bold text-center mb-4">All Student Details</h1>

      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-red-600 text-white text-sm">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Reg No</th>
              <th className="px-4 py-2">Room No</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Village</th>
              <th className="px-4 py-2">Days</th>
              <th className="px-4 py-2">Submit</th>
              <th className="px-4 py-2">Returned</th>
              <th className="px-4 py-2">Approved By</th>
              <th className="px-4 py-2">Come Out</th>
              <th className="px-4 py-2">Come In</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.registerNo}</td>
                <td className="px-4 py-2">{student.roomNumber}</td>
                <td className="px-4 py-2">{student.reason}</td>
                <td className="px-4 py-2">{student.village}</td>
                <td className="px-4 py-2">{student.days}</td>
                <td className="px-4 py-2">{student.submit ? "YES" : "NO"}</td>
                <td className="px-4 py-2">{student.returned ? "YES" : "NO"}</td>
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

      {/* Mobile: Cards */}
      <div className="md:hidden">
        {/* Mobile Select All */}
        <div className="flex items-center gap-2 mb-3 bg-white p-3 rounded-lg shadow">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span className="text-sm font-medium text-gray-700">Select All</span>
        </div>

        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white p-4 rounded-xl shadow flex gap-3 items-start"
            >
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.id)}
                onChange={() => handleSelectStudent(student.id)}
                className="mt-2"
              />
              <img
                src={student.photo}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 text-sm text-gray-700">
                <p className="font-semibold">{student.name}</p>
                <p>Reg: {student.registerNo}</p>
                <p>Room: {student.roomNumber}</p>
                <p className="truncate">Reason: {student.reason}</p>
                <p>Village: {student.village}</p>
                <p>Days: {student.days}</p>
                <p>Submit: {student.submit ? "✅" : "❌"}</p>
                <p>Returned: {student.returned ? "✅" : "❌"}</p>
                {/* Removed Approved By / Out / In from mobile */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
