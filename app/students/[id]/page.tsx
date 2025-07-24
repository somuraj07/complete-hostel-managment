"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Student = {
  id: string;
  name: string;
  registerNo: string;
  roomNumber: string;
  phoneNumber: string;
  reason: string;
  submit: boolean;
};

export default function StudentDetailsPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(`/api/students/${id}`);
      const data = await res.json();
      setStudent(data);
    };

    fetchStudent();
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Register No:</strong> {student.registerNo}</p>
      <p><strong>Room No:</strong> {student.roomNumber}</p>
      <p><strong>Phone:</strong> {student.phoneNumber}</p>
      <p><strong>Reason:</strong> {student.reason}</p>
      <p><strong>Submit:</strong> {student.submit ? "Yes" : "No"}</p>
    </div>
  );
}
