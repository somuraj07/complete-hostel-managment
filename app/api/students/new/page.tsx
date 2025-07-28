"use client";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function StudentForm() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [showCamera, setShowCamera] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    roomNumber: "",
    reason: "",
    village: "",
    phoneNumber: "",
    days: "",
    photo: "",
  });

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setFormData((prev) => ({ ...prev, photo: imageSrc }));
      setShowCamera(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("/api/students", formData);
      if (res.status === 200) {
        toast.success("Outpass submitted!");
        setFormData({
          name: "",
          registerNo: "",
          roomNumber: "",
          reason: "",
          village: "",
          phoneNumber: "",
          days: "",
          photo: "",
        });
        
      }
    } catch (error) {
      toast.error("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f9843d] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white text-[#3d2a1d] border border-orange-200 rounded-2xl shadow-xl p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-[#f9843d]">
          Outpass Request
        </h2>
        <p className="text-sm text-center text-gray-600">
          Please fill out the form to request your outpass
        </p>

        {/* Camera Section */}
        <div className="text-center space-y-2">
          <p className="font-semibold">Capture Your Photo</p>
          <p className="text-xs text-gray-500">Used for verification</p>

          {formData.photo ? (
            <>
              <img
                src={formData.photo}
                alt="Captured"
                className="w-32 h-32 mx-auto rounded-full border border-orange-200 object-cover"
              />
              <button
                type="button"
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
                onClick={() => {
                  setFormData({ ...formData, photo: "" });
                  setShowCamera(true);
                }}
              >
                Retake Photo
              </button>
            </>
          ) : showCamera ? (
            <div className="space-y-2">
              <div className="overflow-hidden rounded-full w-32 h-32 mx-auto border-4 border-[#f9843d]">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "user" }}
                />
              </div>
              <button
                type="button"
                onClick={handleCapture}
                className="bg-[#f9843d] hover:bg-[#e77428] text-white px-4 py-2 rounded shadow"
              >
                Capture Photo
              </button>
            </div>
          ) : null}
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          {[
            { name: "name", label: "Name" },
            { name: "registerNo", label: "Register Number" },
            { name: "roomNumber", label: "Room Number" },
            { name: "reason", label: "Reason for Outpass" },
            { name: "village", label: "Home Village/Town" },
            { name: "phoneNumber", label: "Phone Number" },
            { name: "days", label: "No. of Days" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f9843d]"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#f9843d] hover:bg-[#e77428] text-white font-semibold py-2 rounded-xl shadow-md transition"
        >
          Submit Outpass
        </button>
      </form>
    </div>
  );
}
