import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const anim = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.6 } }),
};

export default function FAQ() {
  const faqs = [
    { q: "How do I add a book?", a: "Open Add Book, fill title/author/genre and submit. Your book will appear in the library after creation." },
    { q: "Can I edit my review?", a: "Yes. You can edit or delete any review you authored from the book detail page." },
    { q: "How does upvoting work?", a: "Authenticated users can upvote books they like. You can't upvote your own upload." },
    { q: "Where is data stored?", a: "Firebase handles auth and your content is stored in the backend database (MongoDB)." },
  ];

  return (
    <main className="min-h-[120vh] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} custom={0} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-[Playfair] text-indigo-600 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Common questions answered — still curious? Reach out via the Contact page.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} custom={0.12 * i}>
              <Disclosure>
                {({ open }) => (
                  <motion.div
                    layout
                    initial={{ borderRadius: 12 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/20 dark:bg-gray-800/20 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
                  >
                    <Disclosure.Button className="flex w-full justify-between items-center focus:outline-none">
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">{f.q}</div>
                      </div>
                      <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </motion.div>
                    </Disclosure.Button>
                    <AnimatePresence>
                      {open && (
                        <Disclosure.Panel
                          as={motion.div}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-sm text-gray-700 dark:text-gray-300 overflow-hidden"
                        >
                          {f.a}
                        </Disclosure.Panel>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={anim} custom={0.8} className="mt-12 text-center">
          <h2 className="text-2xl font-[Playfair] text-indigo-600 mb-4">Support & Troubleshooting</h2>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            If you have problems with the app (signin, adding books), check your console and network tab — or contact support.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
