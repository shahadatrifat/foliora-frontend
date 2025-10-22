import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.6 },
  }),
};

export default function About() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <section className="relative h-[75vh] w-full overflow-hidden">
        <img
          src="/library1.jpg"
          alt="Foliora Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40
 dark:from-black/80 dark:via-black/40 dark:to-black/90"
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-5xl md:text-6xl font-[Playfair] text-white font-bold"
          >
            About Foliora
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            custom={1}
            variants={fadeUp}
            className="text-gray-200 text-lg max-w-2xl mt-6"
          >
            A calm and curated digital bookshelf — built for readers who value
            elegance, focus, and meaningful discovery.
          </motion.p>

          {/* Glass Button */}
          <motion.a
            href="/library"
            
            whileInView="visible"
            custom={2}
            variants={fadeUp}
            className="mt-8 px-6 py-3 rounded-xl border bg-white/10 border-white/40 text-white backdrop-blur-md hover:bg-white/20 transition"
          >
            Explore Library
          </motion.a>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-4 py-20 space-y-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-[Playfair] text-indigo-600 mb-4">
            Why Foliora?
          </h2>
          <p className="leading-relaxed">
            Many book platforms focus on ratings and noise. Foliora emphasizes
            the experience — curated lists, honest reviews, and a personal shelf
            that reflects your journey. The UI is intentionally minimal so your
            content breathes.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="text-2xl font-[Playfair] text-indigo-600 mb-3">
            Community & Features
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Upvotes & Reviews — one review per user per book (editable)</li>
            <li>Bookmarks & Reading Status — track what you're reading</li>
            <li>Personalized recommendations (coming soon)</li>
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h3 className="text-2xl font-[Playfair] text-indigo-600 mb-3">
            Meet the Developer
          </h3>
          <p className="text-sm">
            Built and maintained by{" "}
            <a
              href="https://shahadatrifat.vercel.app/"
              className="font-semibold underline text-indigo-500"
            >
              Shahadat Hossain Rifat
            </a>
            . If you'd like to reach out, use the Contact page.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
