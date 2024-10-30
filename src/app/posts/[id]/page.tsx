import { fetchPostById } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import Image from "next/image";
import React from "react";

async function Blog({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post: Post | null = await fetchPostById(id);
  console.log(post?.headerImage);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="relative h-auto ">
      <div className="flex flex-1 justify-start items-center text-left  flex-col w-[90%] sm:w-[70%] mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-4 self-start pb-10 pt-6  relative">
          {post.title}
        </h1>
        <div className="img-container rounded-xl padding-2">
          <Image
            src={post.headerImage}
            alt="marvel"
            className="object-cover shadow-inner w-screen h-[35vh] sm:h-[60vh] rounded-xl "
            width={600}
            height={600}
          />
        </div>
        <div className="content-container mt-12">
          <p className="text-white text-lg sm:text-xl">P{post.content}</p>
        </div>
      </div>
      {/* <div className="flex items-center justify-center mb-5 w-full fixed bottom-0 left-0">
        <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        />
      </div> */}
    </div>
  );
}

export default Blog;
