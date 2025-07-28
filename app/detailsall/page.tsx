"use client";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  photo: string;
}

export default function DetailsAll() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (!selectedDate) {
      setFilteredStudents(students);
      return;
    }
    const filtered = students.filter((student) => {
      const studentDate = new Date(student.comeoutTime).toISOString().split("T")[0];
      return studentDate === selectedDate;
    });
    setFilteredStudents(filtered);
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const downloadTable = async () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const dateObj = filterDate ? new Date(filterDate) : new Date();
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const tableBody: any[] = [];

    for (let student of filteredStudents) {
      let imageDataUrl = "";

      try {
        const response = await fetch(student.photo);
        const blob = await response.blob();
        imageDataUrl = await convertBlobToBase64(blob);
      } catch (e) {
        console.error("Image fetch failed for:", student.name);
      }

      tableBody.push([
        {
          content: "",
          styles: { cellWidth: 25 },
          image: imageDataUrl,
          imageWidth: 15,
          imageHeight: 15,
        },
        student.name,
        student.registerNo,
        student.roomNumber,
        student.reason,
        student.village,
        student.phoneNumber,
        student.days,
        student.submit ? "YES" : "NO",
        student.returned ? "YES" : "NO",
        student.approvedBy,
        new Date(student.comeoutTime).toLocaleString(),
        new Date(student.comeinTime).toLocaleString(),
      ]);
    }

    autoTable(doc, {
  head: [
    [
      "Photo",
      "Name",
      "Reg No",
      "Room No",
      "Reason",
      "Village",
      "Phone",
      "Days",
      "Submit",
      "Returned",
      "Approved By",
      "Come Out",
      "Come In",
    ],
  ],
  body: tableBody,
  theme: "striped",
  startY: 20,
  headStyles: { fillColor: [41, 128, 185] },
  styles: {
    cellPadding: 3,
    minCellHeight: 20, 
  },
  didDrawCell: (data) => {
    const cellRaw = data.cell.raw as { image?: string; imageWidth?: number; imageHeight?: number };
    if (data.column.index === 0 && cellRaw.image) {
      const x = data.cell.x + 1;
      const y = data.cell.y + 1;
      const imgWidth = cellRaw.imageWidth || 15;
      const imgHeight = cellRaw.imageHeight || 15;

      try {
        doc.addImage(cellRaw.image, "JPEG", x, y, imgWidth, imgHeight);
      } catch (err) {
        console.warn("Failed to add image to PDF cell");
      }
    }
  },
});


    doc.save(`${formattedDate}_students.pdf`);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <button
          onClick={downloadTable}
          className="bg-green-600 hover:bg-=green-700 text-white px-4 py-2 rounded"
        >
          Download as PDF
        </button>

        <label className="text-sm text-black">
          Filter by Come Out Date:
          <input
            type="date"
            value={filterDate}
            onChange={handleDateChange}
            className="ml-2 px-2 py-1 text-black border rounded"
          />
        </label>

      </div>

      <h1 className="text-2xl text-black font-bold mb-4 text-center">All Student Details</h1>

      <div className="overflow-x-auto">
        <table
          id="student-table"
          className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg"
        >
          <thead className="bg-red-600 text-white text-sm">
            <tr>
              <th className="px-4 py-2">Photo</th>
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
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t">
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
                <td className="px-4 py-2">{student.phoneNumber}</td>
                <td className="px-4 py-2">{student.days}</td>
                <td className="px-4 py-2">
                  <span className={student.submit ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {student.submit ? "YES" : "NO"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={student.returned ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {student.returned ? "YES" : "NO"}
                  </span>
                </td>
                <td className="px-4 py-2">{student.approvedBy}</td>
                <td className="px-4 py-2">{new Date(student.comeoutTime).toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(student.comeinTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
