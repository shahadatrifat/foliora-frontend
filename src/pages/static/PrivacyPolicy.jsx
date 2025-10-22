import React from "react";
import { motion } from "framer-motion";

const anim = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
export default function PrivacyPolicy() {
  return (
    <main className="min-h-[120vh] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} className="text-4xl font-[Playfair] text-indigo-600 mb-6">
          Privacy Policy
        </motion.h1>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} className="bg-white/6 dark:bg-white/6 rounded-3xl p-10">
          <h2 className="font-medium text-gray-900 dark:text-white mb-3">Information We Collect</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            Foliora collects minimal information required for functionality: name and email (via Firebase Auth), and any profile details you provide.
            Book metadata (title, author, genre, descriptions) is stored in the backend database.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">How We Use Data</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Data is used to authenticate users, display content, and improve product features.</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Analytics</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">We may store anonymized usage analytics for product improvement.</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium text-gray-900 dark:text-white">Deletion Requests</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">To request deletion of your account or data, contact hello@foliora.app — requests will be verified and processed manually.</p>
          </div>
        </motion.div>

        {/* Additional long-form policy content for readability/length */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} className="mt-12 space-y-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">Security: We take reasonable measures to protect data but no system is 100% secure. Use unique passwords and enable protections where possible.</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">Third Parties: We do not sell personal information. Any third-party services used (analytics, email) are described above.</p>
        </motion.div>
      </section>
    </main>
  );
}
