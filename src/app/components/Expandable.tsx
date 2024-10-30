"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string };
  index: number;
  activeItem: number;
}

interface ExpandableProps {
  list?: { image: string; title: string }[];
  autoPlay?: boolean;
  className?: string;
}
const items = [
  {
    image: "images/fantasy.png",
    title: "Top: Fantasy",
  },
  {
    image: "images/superhero.png",
    title: "Top: Superhero",
  },
  {
    image: "images/classic.png",
    title: "Top: Classics",
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
        src={"/" + item.image}
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
          <div className="bgBlur absolute bottom-0 left-0 w-full h-20 bg-black/5 z-2 backdrop-blur-[4px]">
            <div className=" min-w-fit text-white ml-3 md:bottom-8 md:left-8 z-10 flex h-full justify-start items-center  ">
              <p className=" text-xl sm:text-3xl  md:text-5xl font-bold">
                {item.title}
              </p>
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
          //   onMouseLeave={() => {
          //     setIsHovering(false);
          //   }}
        />
      ))}
    </div>
  );
}
