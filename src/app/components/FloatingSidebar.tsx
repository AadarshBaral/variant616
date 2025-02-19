"use client";
import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

function FloatingSidebar({ className }: { className?: string }) {
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(10);
  const handleLike = () => {
    setLike((prev) => !prev);
    setLikes(likes + 1);
  };
  const handleUnlike = () => {
    setLike((prev) => !prev);
    setLikes(likes - 1);
  };
  return (
    <div
      className={cn(
        "flex gap-2 flex-row  w-36  rounded-2xl justify-around select-none bg-gray-100 p-3  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-foreground/10",
        className
      )}
    >
      <div className="cont flex gap-2 items-center w-10 ">
        {like ? (
          <FaHeart
            className="text-foreground animate-bloop"
            onClick={() => handleUnlike()}
          />
        ) : (
          <FaRegHeart
            className="text-foreground   "
            onClick={() => handleLike()}
          />
        )}
        <p className="text-foreground">{likes}</p>
      </div>
      <FaRegShareFromSquare className="text-foreground " size={24} />
    </div>
  );
}

export default FloatingSidebar;
