import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IImageCardProps {
  image: string;
  title: string;
  id: string;
}

function MovieBlogCard({ image, title, id }: IImageCardProps) {
  return (
    <Link
      href={`posts/${id}`}
      className="h-[400px] sm:h-[500px] w-[300px] mx-auto sm:w-[350px] md:w-[360px] lg:w-[400px] bg-foreground  relative rounded-xl"
    >
      <Image
        src={image}
        alt="movie"
        className="h-full w-full object-cover shadow-inner rounded-xl  "
        width={400}
        height={400}
      />

      <div className="absolute bottom-0 left-0 w-full h-44 bg-black/30 z-2 backdrop-blur-[4px] rounded-xl">
        <div className=" min-w-fit text-white ml-3 md:bottom-8 md:left-8 z-10 flex h-full justify-start items-start flex-col  ">
          <p className="w-full mx-2 text-xl sm:text-3xl">{title}</p>
        </div>
        <div className=" absolute bottom-4 left-4 bg-transparent border-2 border-foreground rounded-2xl p-2">
          <p className="text-foreground">Read More</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieBlogCard;
