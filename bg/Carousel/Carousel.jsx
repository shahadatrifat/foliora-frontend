import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import axios from "axios";
import { FiFileText, FiCircle, FiLayers, FiLayout, FiCode } from 'react-icons/fi';
import { Sparkles } from "lucide-react";
import { Link } from "react-router";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/recent-reviews`) // Adjust with the correct API endpoint for reviews
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Error fetching reviews", err);
      });
  }, []);

  // Carousel settings
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const carouselItems = loop ? [...reviews, reviews[0]] : reviews;

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === reviews.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, reviews.length, carouselItems.length, pauseOnHover]);

  // Drag functionality
  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === reviews.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(reviews.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const range = [-(currentIndex + 1) * trackItemOffset, -currentIndex * trackItemOffset, -(currentIndex - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
  <div
    className={`relative  container mx-auto  overflow-hidden p-4 ${round ? "rounded-full border border-white" : "rounded-[24px] border border-gray-200 dark:border-gray-700"}`}
    style={{ width: `${baseWidth}px`, ...(round && { height: `${baseWidth}px` }) }}
  >
    <motion.div
      className="flex"
      drag="x"
      dragConstraints={{
        left: -trackItemOffset * (reviews.length - 1),
        right: 0,
      }}
      style={{
        width: itemWidth,
        gap: `${GAP}px`,
        x,
      }}
      onDragEnd={handleDragEnd}
      animate={{ x: -(currentIndex * trackItemOffset) }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {reviews.map((review, index) => (
        <motion.div
         viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onAnimationComplete={handleAnimationComplete}
          {...dragProps}
          
          key={index}
          className={`relative shrink-0 flex flex-col ${
            round
              ? "items-center justify-center text-center bg-gray-50 dark:bg-gray-800 border-0"
              : "items-start justify-between bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[12px]"
          } overflow-hidden cursor-grab active:cursor-grabbing`}
          style={{
            width: itemWidth,
            height: round ? itemWidth : "100%",
            rotateY,
            ...(round && { borderRadius: "50%" }),
          }}
          transition={effectiveTransition}
        >
          <div className={`${round ? "p-0 m-0" : " p-5"}`}>
            <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-gray-900 dark:bg-gray-500">
              <FiFileText className="h-[16px] w-[16px] text-white" />
            </span>
          </div>
          <div className="p-5">
            <div className="mb-2 text-lg text-gray-700 dark:text-gray-200">
              Book:<Link className="text-gray-700  text-lg font-semibold font-[Playfair] hover:underline dark:text-gray-200" to={`/book/${review.bookId}`}> {review.bookTitle}</Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{review.bookAuthor}</p> 
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">Review:</p> <p className="text-sm   text-gray-500 dark:text-gray-400">  {review.comment}</p>
            <div className="flex items-center mt-2">
              <img
                src={review.reviewerPhoto}
                alt={review.reviewerName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200  ">{review.reviewerName}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1  ">{review.rating}</span> <Sparkles className="text-yellow-500" size={16}></Sparkles>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    <div className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""}`}>
      <div className="mt-4 flex w-[150px] justify-between px-8">
        {reviews.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
              currentIndex % reviews.length === index
                ? round
                  ? "bg-white"
                  : "bg-[#333333]"
                : round
                ? "bg-[#555]"
                : "bg-[rgba(51,51,51,0.4)]"
            }`}
            animate={{
              scale: currentIndex % reviews.length === index ? 1.2 : 1,
            }}
            onClick={() => setCurrentIndex(index)}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
    </div>
  </div>
);

}
