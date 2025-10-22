"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const anim = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.6 } }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000)); 
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[120vh] bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-300">
      <section className="max-w-6xl mx-auto px-6 py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={anim}
          custom={0}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-[Playfair] text-indigo-600 mb-4">Contact</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400">
            Have feedback, partnership ideas, or spotted a bug? Drop a message and I’ll get back to you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={anim}
          custom={0.12}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl  backdrop-blur-sm space-y-6 border border-indigo-200 dark:border-gray-700"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="p-3 rounded-lg bg-white/20 dark:bg-black/20 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              aria-label="Your name"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
              className="p-3 rounded-lg bg-white/20 dark:bg-black/20 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              required
              aria-label="Your email"
            />
          </motion.div>

          <motion.textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows={8}
            placeholder="Your message"
            className="w-full p-3 rounded-lg bg-white/20 dark:bg-black/20 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            required
            aria-label="Your message"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition disabled:opacity-50`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Or email directly:{" "}
              <a className="underline" href="mailto:hello@foliora.app">
                hello@foliora.app
              </a>
            </div>
          </div>
        </motion.form>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={anim}
          custom={0.24}
          className="mt-16 space-y-6"
        >
          <h2 className="text-2xl font-[Playfair] text-indigo-600">Office</h2>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Foliora is an independent project. For business inquiries please email hello@foliora.app.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              { title: "General", email: "hello@foliora.app" },
              { title: "Partnerships", email: "partners@foliora.app" },
            ].map((info) => (
              <motion.div
                key={info.title}
                whileHover={{ y: -4 }}
                className="bg-white/20 dark:bg-gray-800/20 p-6 rounded-2xl  border border-indigo-200 dark:border-gray-700 transition"
              >
                <h4 className="font-medium">{info.title}</h4>
                <p className="text-sm mt-2">{info.email}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
