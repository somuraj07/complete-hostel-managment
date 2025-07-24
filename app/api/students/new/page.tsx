"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Phone, User, Hash, Home, StickyNote, CalendarDays } from "lucide-react";

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

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-2xl shadow-xl p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Outpass Form</h2>
    
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
          <input
            name="name"
            placeholder="Name"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
    
        {/* Register No */}
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
          <input
            name="registerNo"
            placeholder="Register No"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80"
            value={formData.registerNo}
            onChange={handleChange}
          />
        </div>
    
        {/* Room Number */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
          <input
            name="roomNumber"
            placeholder="Room Number"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80"
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </div>
    
        {/* Reason */}
        <div className="relative">
          <StickyNote className="absolute left-3 top-4 text-white/70" size={20} />
          <textarea
            name="reason"
            placeholder="Reason"
            rows={3}
            className="w-full pl-10 pr-4 pt-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80 resize-none"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>
    
        {/* Village */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
          <input
            name="village"
            placeholder="Village"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80"
            value={formData.village}
            onChange={handleChange}
          />
        </div>
    
        {/* Phone Number */}
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
    
        {/* Days */}
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
          <input
            name="days"
            placeholder="Days"
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/80"
            value={formData.days}
            onChange={handleChange}
          />
        </div>
    
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
    
  
  );
}
