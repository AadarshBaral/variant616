import Image from "next/image";
import React from "react";

interface IImageCardProps {
  image: string;
  title: string;
}

function SingleMovieCard({ image, title }: IImageCardProps) {
  return (
    <div className="h-64 sm:h-80 w-70 bg-foreground mt-8 relative ">
      <Image
        src={image}
        alt="movie"
        className="h-full w-full object-cover shadow-inner  "
        width={300}
        height={300}
      />

      <div className="absolute bottom-0 left-0 w-full h-24 bg-black/30 z-2 backdrop-blur-[4px] ">
        <div className=" min-w-fit text-white ml-3 md:bottom-8 md:left-8 z-10 flex h-full justify-start items-center  ">
          <div className=" text-xl sm:text-3xl  md:text-4xl ">
            <p>Top:</p>
            <span className="text-[#FFDE77]">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleMovieCard;
