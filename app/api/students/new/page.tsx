"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    roomNumber: "",
    reason: "",
    village: "",
    phoneNumber: "",
    days: "",
    submit: false,     // hidden from UI, but still sent as false
    returned: false,   // hidden from UI, but still sent as false
  });
  // acces the values from inputs  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
// handle the submit of the form
  // submit the form data to the api  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting...");

    try {
      await axios.post("/api/students", formData);
      toast.success("Form submitted successfully!", { id: loadingToast });
      setFormData({
        name: "",
        registerNo: "",
        roomNumber: "",
        reason: "",
        village: "",
        phoneNumber: "",
        days: "",
        submit: false,
        returned: false,
      });
    } catch (error: any) {
      console.error("❌ Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!", {
        id: loadingToast,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 flex flex-col gap-4 p-4 border rounded shadow"
    >
      <input name="name" placeholder="Name" className="input" value={formData.name} onChange={handleChange} />
      <input name="registerNo" placeholder="Register No" className="input" value={formData.registerNo} onChange={handleChange} />
      <input name="roomNumber" placeholder="Room Number" className="input" value={formData.roomNumber} onChange={handleChange} />
      <textarea name="reason" placeholder="Reason" className="input" value={formData.reason} onChange={handleChange} />
      <input name="village" placeholder="Village" className="input" value={formData.village} onChange={handleChange} />
      <input name="phoneNumber" placeholder="Phone Number" className="input" value={formData.phoneNumber} onChange={handleChange} />
      <input name="days" placeholder="Days" className="input" value={formData.days} onChange={handleChange} />
      
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}
