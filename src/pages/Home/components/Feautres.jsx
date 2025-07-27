// src/components/Features.jsx
import { BookText, Heart, Star, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import readingAnimation from "../../../assets/lotties/reading.json";
import { Player } from "@lottiefiles/react-lottie-player";

const features = [
  {
    icon: <BookText size={28} />,
    title: "Track Your Reading",
    desc: "Monitor your current reads and mark your progress easily.",
  },
  {
    icon: <Heart size={28} />,
    title: "Wishlist Favorite Books",
    desc: "Save books you want to read later and organize them beautifully.",
  },
  ,
  {
    icon: <Star size={28} />,
    title: "Rate Your Favorites",
    desc: "Rate your favorite books and share your thoughts with others.",
  },
];

const Features = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="py-16 bg-white dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold font-[Playfair] text-center mb-12 dark:text-white">
          Why Choose Foliora?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 rounded-xl bg-gray-50 dark:bg-white/5 text-center shadow hover:shadow-lg"
            >
              <div className="text-indigo-600 dark:text-indigo-400 mb-4 flex justify-center">
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {feat.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
