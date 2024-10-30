"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface ExpandableItemProps {
  id: string;
  headerImage: string;
  title: string;
}

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: ExpandableItemProps;
  index: number;
  activeItem: number;
}

interface ExpandableProps {
  list?: ExpandableItemProps[];
  autoPlay?: boolean;
  className?: string;
}
const items = [
  {
    id: "1",
    title: "Exploring the Marvel Cinematic Universe",
    slug: "exploring-marvel-cinematic-universe",
    headerImage: "images/fantasy.png",
    featured: true,
    heroFeatured: false,
    content:
      "Marvel's universe brings to life iconic heroes and villains, captivating audiences worldwide. This post dives into its most notable films and characters.",
    category: ["Movies", "Marvel", "Entertainment"],
    date: "2024-01-15",
    author: "John Doe",
  },
  {
    id: "2",
    title: "Understanding the Basics of React",
    slug: "understanding-basics-react",
    headerImage: "images/fantasy.png",
    featured: true,
    heroFeatured: true,
    content:
      "React is a powerful JavaScript library for building user interfaces. In this article, we cover essential concepts to get you started with React development.",
    category: ["Programming", "JavaScript", "React"],
    date: "2024-02-01",
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "10 Tips for Healthy Living",
    slug: "10-tips-healthy-living",
    headerImage: "images/fantasy.png",
    featured: false,
    heroFeatured: false,
    content:
      "Adopting a healthier lifestyle doesn’t have to be difficult. Here are ten simple tips for living a more balanced, fulfilling life.",
    category: ["Health", "Lifestyle", "Wellness"],
    date: "2024-03-10",
    author: "Alex Johnson",
  },
];
const List = ({ item, className, index, activeItem, ...props }: ImageProps) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-10 rounded-2xl sm:w-36 min-w-10 cursor-pointer overflow-hidden delay-0 transition-all duration-300 ease-in-out ",
        {
          "flex-grow": index === activeItem,
        },
        className
      )}
      {...props}
    >
      <Image
        src={item.headerImage}
        alt={item.title}
        width={600}
        height={600}
        className={cn(
          "h-full w-full object-cover shadow-inner shadow-black/50 brightness-95",
          {
            "blur-[2px] brightness-50": index !== activeItem,
          }
        )}
      />

      {index === activeItem && (
        <>
          <div className="bgBlur absolute bottom-0 left-0 w-full h-20 sm:h-32 bg-black/5 z-2 backdrop-blur-[4px]">
            <div className=" min-w-fit text-white ml-3 md:bottom-8 md:left-8 z-10 flex h-full justify-start items-center  ">
              <Link href={`posts/${item.id}`}>
                <p className=" text-xl sm:text-3xl  md:text-5xl font-bold ">
                  {item.title}
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Expandable({
  list = items,
  autoPlay = true,
  className,
}: ExpandableProps) {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveItem((prev) => (prev + 1) % list.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, list.length, isHovering]);

  return (
    <div
      className={cn(
        "flex h-[50vh]  md:h-[70vh] lg:h-[80vh] w-[95%] mx-auto mt-10 sm:mt-6 gap-x-2 ",
        className
      )}
    >
      {list.map((item, index) => (
        <List
          key={item.title}
          item={item}
          index={index}
          activeItem={activeItem}
          onMouseEnter={() => {
            setActiveItem(index);
            setIsHovering(true);
          }}
        />
      ))}
    </div>
  );
}
