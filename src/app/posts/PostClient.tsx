"use client";
import { fetchPostsByCategory } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import React, { useEffect, useState } from "react";
import MovieBlogCard from "../components/MovieBlogCard";
import { categories } from "@/utils/textData";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { cn } from "@/utils/cn";

import { useRouter } from "next/navigation";

interface PostClientProps {
  initialPosts: Post[];
  selectedCategory: string;
}

export default function Posts({
  initialPosts,
  selectedCategory,
}: PostClientProps) {
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);
  const scrollOffset = 100;
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const handleLeftClick = () => {
    if (ref.current) {
      ref.current.scrollLeft -= scrollOffset;
      checkScrollPosition();
    }
  };

  const handleRightClick = () => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
      checkScrollPosition();
    }
  };

  const checkScrollPosition = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setIsAtStart(scrollLeft <= 10);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  // Add scroll event listener to update chevron visibility on manual scroll
  useEffect(() => {
    const container = ref.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check on mount
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleCategoryClick = async (category: string) => {
    const newCategory = category.toLowerCase();
    setCurrentCategory(newCategory);
    router.push(category.toLowerCase());
    setLoading(true);
    const res = await fetchPostsByCategory(newCategory);
    setPosts(res as Post[]);
    setLoading(false);
  };

  return (
    <div className="w-full h-auto z-10 ">
      <div className="parent relative ">
        <div
          style={{ scrollBehavior: "smooth" }}
          ref={ref}
          className="categorical-container w-auto flex flex-row justify-start items-center h-auto mt-10 overflow-hidden overflow-x-auto scroll-m-10 sm:overflow-hidden transition-all duration-100 -z-10"
        >
          {categories.map((category, i) => (
            <p
              key={i}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                `child  text-primary rounded-xl px-3 py-1 mx-2 text-md cursor-pointer bg-transparent border-2 text-foreground border-foreground`,
                currentCategory === category.toLowerCase() &&
                  "bg-foreground text-background border-0"
              )}
            >
              {category}
            </p>
          ))}

          {/* Left Scroll Button */}
          {!isAtStart && (
            <div
              onClick={handleLeftClick}
              style={{ boxShadow: "10px 0px 20px 10px #141A13" }}
              className="absolute -left-0 z-20 left-btn bg-background shadow-2xl shadow-black h-14 w-10 flex justify-center items-center"
            >
              <BiChevronLeft className="h-6 w-6 text-white cursor-pointer" />
            </div>
          )}

          {/* Right Scroll Button */}
          {!isAtEnd && (
            <div
              onClick={handleRightClick}
              style={{ boxShadow: "10px 0px 20px 10px #141A13" }}
              className="absolute -right-0 z-20 right-btn bg-background shadow-2xl shadow-black h-14 w-10 flex justify-center items-center"
            >
              <BiChevronRight className="h-6 w-6 text-white cursor-pointer" />
            </div>
          )}
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="blogContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center h-full w-[100%] sm:w-[95%] sm:gap-x-2 sm:gap-y-7 mx-auto mt-10">
          {posts.map((post) => (
            <MovieBlogCard
              key={post.id}
              image={post.headerImage}
              id={post.id}
              slug={post.slug}
              title={post.title}
              className="lg:w-64 lg:h-80 md:w-64 md:h-80 sm:w-64 sm:h-80 w-auto h-[340px] "
              blurClassName="sm:h-32 h-36 "
              textClassName="sm:text-lg text-md"
              btnClassName="p-2 text-sm left-2 rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[30vh] flex justify-center items-center ">
          <p className="text-center text-lg text-foreground text-foreground/50">
            No Posts Found
          </p>
        </div>
      )}
    </div>
  );
}
