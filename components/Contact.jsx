import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ideaTitle: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.ideaTitle.trim() ||
      !formData.message.trim()
    ) {
      setResultMsg({ type: "error", text: "Please fill in all the fields." });
      return;
    }

    setSending(true);
    setResultMsg(null);

    try {
      const serviceID = "YOUR_SERVICE_ID";    // Replace with your EmailJS Service ID
      const templateID = "YOUR_TEMPLATE_ID";  // Replace with your EmailJS Template ID
      const publicKey = "YOUR_PUBLIC_KEY";    // Replace with your EmailJS Public Key

      await emailjs.send(serviceID, templateID, formData, publicKey);

      setResultMsg({
        type: "success",
        text: "Thanks for sharing your idea! I’ll review it and get back to you soon.",
      });

      setFormData({ name: "", email: "", ideaTitle: "", message: "" });
    } catch (error) {
      console.error(error);
      setResultMsg({
        type: "error",
        text: "Oops! Something went wrong. Please try again later.",
      });
    }

    setSending(false);
  };

  return (
    <div
      className={`min-h-screen px-6 py-16 transition-colors duration-500 flex flex-col justify-center ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-10 shadow-lg">
        <h1 className="text-5xl font-extrabold mb-6 text-center tracking-tight">
          Share Your Vision & Ideas
        </h1>

        <p className="mb-10 text-center text-lg opacity-80 leading-relaxed">
          Whether you're an entrepreneur, creator, or just someone with a spark of inspiration, this is the place to share your ideas and projects.  
          <br />
          Let's collaborate and bring your vision to life!  
          <br />
          Simply fill out the form below and I'll personally review your message.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-4 rounded-md bg-white/20 text-white placeholder-white outline-none focus:ring-4 focus:ring-yellow-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-md bg-white/20 text-white placeholder-white outline-none focus:ring-4 focus:ring-yellow-400 transition"
            required
          />

          <input
            type="text"
            name="ideaTitle"
            placeholder="Idea or Project Title"
            value={formData.ideaTitle}
            onChange={handleChange}
            className="p-4 rounded-md bg-white/20 text-white placeholder-white outline-none focus:ring-4 focus:ring-yellow-400 transition"
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Describe your idea or message here..."
            value={formData.message}
            onChange={handleChange}
            className="p-4 rounded-md bg-white/20 text-white placeholder-white outline-none focus:ring-4 focus:ring-yellow-400 resize-none transition"
            required
          />

          <button
            type="submit"
            disabled={sending}
            className={`py-4 rounded-lg font-extrabold shadow-lg text-gray-900 transition ${
              sending
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300"
            }`}
          >
            {sending ? "Sending..." : "Send Your Idea"}
          </button>

          {resultMsg && (
            <p
              className={`text-center font-semibold mt-4 ${
                resultMsg.type === "error" ? "text-red-500" : "text-green-400"
              }`}
            >
              {resultMsg.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
