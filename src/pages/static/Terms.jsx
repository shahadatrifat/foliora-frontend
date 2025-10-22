import React from "react";
import { motion } from "framer-motion";

const anim = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Terms() {
  return (
    <main className="min-h-[120vh] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-start">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim}>
          <h1 className="text-4xl font-[Playfair] text-indigo-600 mb-4">Terms & Conditions</h1>
          <p className="text-sm mb-6">Please read these terms carefully. By using Foliora you agree to the following conditions.</p>

          <ol className="list-decimal list-inside space-y-3 text-sm">
            <li>Do not upload illegal or copyrighted content you don't own rights to.</li>
            <li>Respect other users — no harassment, hate or abusive content.</li>
            <li>We are not responsible for user-generated content; use your judgment when interacting with others.</li>
            <li>Repeated violations of rules may lead to content removal or account suspension.</li>
            <li>We reserve the right to update these terms; continued use implies acceptance.</li>
          </ol>

          <div className="mt-8 text-sm">
            <strong>Contact about terms:</strong> <div className="mt-2">hello@foliora.app</div>
          </div>
        </motion.div>

        <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} className="flex justify-center md:justify-end">
          <div className="w-full max-w-md bg-white/6 dark:bg-white/6 rounded-3xl p-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Summary</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Be respectful, post only what you can legally share, and follow community guidelines.</p>
            <div className="text-sm">If unsure, contact support before posting.</div>
          </div>
        </motion.aside>
      </section>

      {/* Additional long scrollable notes */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim}>
          <h2 className="text-2xl font-[Playfair] text-indigo-600 mb-4">Policies & Enforcement</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">When content violates these terms we may remove it and notify the user. Appeals can be submitted to hello@foliora.app where applicable.</p>
        </motion.div>
      </section>
    </main>
  );
}
