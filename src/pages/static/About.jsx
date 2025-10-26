import { motion } from "framer-motion";
import { BookOpen, Users, Target, Heart, Sparkles, TrendingUp, Award, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.6 },
  }),
};

export default function About() {
  const features = [
    {
      icon: BookOpen,
      title: "Curated Collections",
      description: "Discover handpicked books organized by genre, mood, and community favorites.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with fellow readers, share reviews, and get personalized recommendations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Reading Goals",
      description: "Set and track your reading goals with visual progress tracking and achievements.",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: Heart,
      title: "Personal Library",
      description: "Build your digital bookshelf with reading status tracking and bookmarks.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "1,000+", label: "Books Available" },
    { number: "500+", label: "Active Readers" },
    { number: "2,500+", label: "Reviews Written" },
    { number: "100+", label: "Top Rated Books" }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Quality Over Quantity",
      description: "We focus on meaningful content and genuine reader experiences, not just numbers."
    },
    {
      icon: TrendingUp,
      title: "Growth Together",
      description: "We grow as a community, helping each other discover amazing books and authors."
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Celebrate reading achievements and milestones with our goal tracking system."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly improving with new features based on community feedback and needs."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        <img
          src="/library1.jpg"
          alt="Foliora Library"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 dark:from-black/80 dark:via-black/60 dark:to-black/90" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <BookOpen className="w-20 h-20 text-white mx-auto" />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            About Foliora
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-gray-200 text-xl max-w-3xl leading-relaxed"
          >
            A digital sanctuary for book lovers. Discover, track, and celebrate your reading journey
            with a community that shares your passion.
          </motion.p>

          <motion.a
            href="/library"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 rounded-full bg-white/10 border-2 border-white/40 text-white backdrop-blur-md hover:bg-white/20 transition-all font-semibold text-lg"
          >
            Explore Library →
          </motion.a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Foliora was born from a simple belief: reading should be a joyful, organized, and
            social experience. We're building more than just a book platform — we're creating
            a home for readers to discover, connect, and grow together.
          </p>
        </motion.div>

        {/* Why Foliora Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose Foliora?
          </h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              Unlike other book platforms that focus on overwhelming ratings and noise, 
              Foliora emphasizes the <span className="font-semibold text-indigo-600 dark:text-indigo-400">reading experience</span>.
            </p>
            <p className="text-lg leading-relaxed">
              We believe in curated lists, honest reviews, and a personal library that 
              reflects your unique journey. Our UI is intentionally minimal — because 
              your books and thoughts should shine, not get lost in clutter.
            </p>
            <p className="text-lg leading-relaxed">
              Every feature is designed with one goal: to make your reading life better, 
              more organized, and more enjoyable.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Features designed for passionate readers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow hover:shadow-md transition-all"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Features */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Join Our Reading Community
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Be part of a growing community of book lovers. Share reviews, discover new favorites,
              and track your reading journey together.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Upvotes & Reviews",
                  description: "One honest review per user per book — quality over quantity"
                },
                {
                  title: "Reading Status",
                  description: "Track what you're reading, want to read, or have finished"
                },
                {
                  title: "Goal Tracking",
                  description: "Set reading goals and celebrate your achievements"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Meet the Developer
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Foliora is built and maintained with ❤️ by{" "}
                <a
                  href="https://shahadatrifat.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline transition-colors"
                >
                  Shahadat Hossain Rifat
                </a>
                , a passionate full-stack developer and avid reader.
              </p>
              <p className="text-lg leading-relaxed">
                The goal is simple: create a beautiful, functional space where readers can
                organize their books, discover new favorites, and connect with others who
                share their love for reading.
              </p>
              <p className="text-lg leading-relaxed">
                Have feedback or suggestions? Visit the{" "}
                <a href="/contact" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Contact page
                </a>{" "}
                to get in touch!
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="/library"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Browse Library
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 dark:bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of readers who are discovering, tracking, and celebrating
              their love for books with Foliora.
            </p>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Join Foliora Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}