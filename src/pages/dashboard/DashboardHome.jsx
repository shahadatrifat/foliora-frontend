import { useEffect, useState, useContext } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import DashboardStats from "./DashboardStats";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([
    { name: "Reading", posts: [] },
    { name: "Read", posts: [] },
    { name: "Want to read", posts: [] },
  ]);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    // Fetch the books based on the logged-in user
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/books?email=${user?.email}`)
      .then((res) => {
        const books = res.data;
        console.log(books);
        const categorizedBooks = {
          Reading: [],
          Read: [],
          "Want-to-Read": [],
        };

        books.forEach((book) => {
          const status = book.readingStatus?.find((status) => status.email === user.email)?.status || "Not Started";
          // Categorize books based on their reading status
          if (categorizedBooks[status]) {
            categorizedBooks[status].push(book);
          }
        });

        // Set the categorized books into the state
        setCategories([
          { name: "Reading" , posts: categorizedBooks.Reading },
          { name: "Read", posts: categorizedBooks.Read },
          { name: "Want to read", posts: categorizedBooks["Want-to-Read"] },
        ]);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, [user]);
const ReadingCount =(categories[0].posts?.length);
const ReadCount = (categories[1].posts?.length);
const WantToReadCount = (categories[2].posts?.length);
  return (
    <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="">
      <h2 className="text-xl text-gray-700 dark:text-gray-200 font-semibold mb-6">
        Welcome to your dashboard <br /><span className="font-[serif] text-primary text-2xl">{user?.displayName}</span>
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center px-4 py-10">
        <div className="w-full sm:w-md  max-w-sm">
          <TabGroup>
            <TabList className="flex sm:gap-2 gap-4 flex-wrap sm:flex-nowrap">
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className="rounded-full px-3 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400 
             hover:bg-gray-500/10 dark:hover:bg-gray-700 
             focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 
             data-selected:bg-gray-200 data-selected:data-hover:bg-white 
             dark:data-selected:bg-gray-700 dark:data-selected:data-hover:bg-gray-600"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="mt-3">
              {categories.map(({ name, posts }) => (
                <TabPanel key={name} className="rounded-xl bg-gray-200 dark:bg-gray-800 p-3">
                  <ul>
                    {posts.map((post) => (
                      <li key={post._id} className="relative rounded-md p-3 text-sm transition hover:bg-white/5 dark:hover:bg-gray-800">
                        <Link to={`/book/${post._id}`} className="font-semibold text-gray-800 dark:text-gray-200">
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                        <ul className="flex gap-2 text-gray-400 dark:text-gray-500  text-sm" aria-hidden="true">
                          <li>{post.publishingYear}</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{post.reviews?.length || 0} comments</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{post.upvotes?.length || 0} upvotes</li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div>
        <div>
        <DashboardStats ReadingCount={ReadingCount} ReadCount={ReadCount} WantToReadCount={WantToReadCount}></DashboardStats>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
