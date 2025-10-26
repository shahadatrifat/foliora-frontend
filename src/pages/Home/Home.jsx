import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Features from "./components/Feautres";
import NewsletterSection from "./components/modals/NewsLetterSection";
import { motion } from "framer-motion";
import Stats from "./components/Stats";
import api, { extractArray } from "../../api";
import TopRatedBooks from "./components/TopRatedBooks";
import TrendingBooks from "./components/TrendingBooks";
import Reviews from "./components/Reviews";
import CallToAction from "./components/CallToAction";

const Home = () => {
   const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [topUpvotedBooks, setTopUpvotedBooks] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [stats, setStats] = useState({ books: 0, users: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);


   useEffect(() => {
    const fetchAll = async () => {
      try {
        // Top rated
        const ratedRes = await api.get(`${import.meta.env.VITE_API_URL}/api/books/top/rated`);
        const rated = extractArray(ratedRes);
        setTopRatedBooks(rated);

        // Top upvoted
        const upvotedRes = await api.get(`${import.meta.env.VITE_API_URL}/api/books/top/upvoted`);
        const upvoted = extractArray(upvotedRes);
        setTopUpvotedBooks(upvoted);

        // Recent reviews
        const reviewsRes = await api.get(`${import.meta.env.VITE_API_URL}/api/recent-reviews`);
        const reviews = extractArray(reviewsRes);
        setRecentReviews(reviews.slice(0, 6));

        try {
          const statsRes = await api.get(`${import.meta.env.VITE_API_URL}/api/stats`);
          const payload = statsRes?.data;
          setStats({
            books: payload?.books ?? rated.length,
            users: payload?.users ?? 0,
            reviews: payload?.reviews ?? reviews.length,
          });
        } catch {
          setStats({
            books: rated.length || upvoted.length || 0,
            users: 0,
            reviews: recentReviews.length || 0,
          });
        }
      } catch (err) {
        console.error("Home data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  return (
    <div className="min-h-screen">
      <Hero></Hero>
      <Stats></Stats>
      <Features></Features>
      <TopRatedBooks books={topRatedBooks}></TopRatedBooks>
      <TrendingBooks books={topUpvotedBooks}></TrendingBooks>
      <Reviews reviews={recentReviews}></Reviews>
      <CallToAction></CallToAction>
      
      <NewsletterSection></NewsletterSection>
    </div>
  );
};

export default Home;
