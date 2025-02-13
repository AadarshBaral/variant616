import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IImageCardProps {
  image: string;
  title: string;
  id: string;
  slug: string;
  className?: string;
  blurClassName?: string;
  textClassName?: string;
  btnClassName?: string;
}

function MovieBlogCard({
  image,
  title,
  id,
  className,
  blurClassName,
  textClassName,
  slug,
  btnClassName,
}: IImageCardProps) {
  return (
    <Link
      href={`posts/${slug}`}
      className={cn(
        "h-[400px] group sm:h-[500px] mx-10 w-auto sm:mx-auto sm:w-[350px] md:w-[360px] lg:w-[400px] bg-foreground  relative rounded-xl sm:my-0 my-4",
        className
      )}
    >
      <Image
        src={image}
        alt="movie"
        className="h-full w-full object-cover shadow-inner rounded-xl  "
        width={400}
        height={400}
      />

      <div
        className={cn(
          "absolute bottom-0 left-0 w-full h-28 sm:h-40 group-hover:scale-110 transition-all duration-100 bg-black/30 z-2 backdrop-blur-[4px] rounded-xl ease-in-out",
          blurClassName
        )}
      >
        <div className=" min-w-fit text-white px-2 py-2 md:bottom-8  z-10 flex h-full justify-start items-start flex-col  ">
          <p className={cn("w-full  text-xl sm:text-3xl ", textClassName)}>
            {title.length > 50 ? title.slice(0, 50) + "..." : title}
          </p>
        </div>
        <div
          className={cn(
            " absolute bottom-4 left-4 bg-transparent border-2 border-foreground rounded-2xl p-2",
            btnClassName
          )}
        >
          <p className="text-foreground">Read More</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieBlogCard;
