// src/pages/RequestAccess.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the initial state for the form so we can easily reset it.
const initialFormData = {
  name: "",
  email: "",
  profession: "",
  organization: "",
  purpose: "",
  termsAccepted: false,
};

export default function RequestAccess({ isOpen = false, onClose = () => {} }) {
  useEffect(() => {
    // Close the modal on 'Escape' key press
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Local form state
  const [formData, setFormData] = useState(initialFormData);

  // Effect to reset the form whenever the modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to allow exit animation to complete
      setTimeout(() => {
        setFormData(initialFormData);
      }, 200);
    }
  }, [isOpen]);

  // A more robust change handler that works for text inputs, selects, and checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    console.log("Access Request Submitted:", formData);
    alert(`✅ Request submitted successfully!\nWe will review your request and get back to you at ${formData.email}.`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Transparent blurred backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="relative w-full max-w-lg mx-4 z-10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1C1C1C] rounded-2xl p-8 shadow-2xl border border-gray-800 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white text-2xl font-semibold">Request Data Access</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Please fill out your details to request access to the dataset.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-800/60 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* 1. Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Ada Lovelace"
                    className="w-full rounded-lg px-4 py-2 bg-[#111] text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                
                {/* 2. Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg px-4 py-2 bg-[#111] text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* 3. Profession Options */}
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-1.5">Profession</label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg px-4 py-2 bg-[#111] text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none bg-no-repeat bg-right pr-8"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em' }}
                  >
                    <option value="" disabled>Select your profession</option>
                    <option value="student">Student</option>
                    <option value="researcher">Researcher</option>
                    <option value="developer">Developer</option>
                    <option value="journalist">Journalist</option>
                    <option value="hobbyist">Hobbyist</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* 4. Name of Organisation/Institute */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-1.5">Organisation / Institute</label>
                  <input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    placeholder="e.g., University of Cambridge"
                    className="w-full rounded-lg px-4 py-2 bg-[#111] text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                
                {/* 5. Purpose of Access */}
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-gray-300 mb-1.5">Purpose of Access</label>
                  <textarea
                    id="purpose"
                    name="purpose"
                    rows={3}
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    placeholder="Briefly describe how you intend to use this data..."
                    className="w-full rounded-lg px-4 py-2 bg-[#111] text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                  />
                </div>

                {/* 6. Terms Agreement */}
                <div className="flex items-center gap-3">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                   <label htmlFor="termsAccepted" className="text-sm text-gray-400">
                    I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Terms and Conditions</a>.
                  </label>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row-reverse gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Submit Request
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gray-800/60 text-gray-300 font-medium hover:bg-gray-800/90 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}