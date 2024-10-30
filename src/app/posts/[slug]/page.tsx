"use client";

import { fetchPostById } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { use } from "react";

type Params = Promise<{ slug: string }>;

function Blog(props: { params: Params }) {
  const params = use(props.params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      setLoading(true); // Start loading
      const fetchedPost = await fetchPostById(params.slug); // Fetch post by slug
      setPost(fetchedPost);
      setLoading(false); // Stop loading
    }

    loadPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className=" flex    h-[50vh] justify-center items-center ">
        <p className="text-center text-white text-2xl">Loading Post</p>
      </div>
    );
  }

  if (!post) {
    return <p className="text-center text-xl mt-10">Post not found</p>;
  }

  return (
    <div className="relative h-auto">
      <div className="flex flex-1 justify-start items-center text-left flex-col w-[90%] sm:w-[70%] mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-4 self-start pb-10 pt-6 relative">
          {post.title}
        </h1>
        <div className="img-container rounded-xl padding-2">
          <Image
            src={post.headerImage}
            alt={post.title} // Use dynamic alt text
            className="object-cover shadow-inner w-screen h-[35vh] sm:h-[60vh] rounded-xl"
            width={600}
            height={600}
          />
        </div>
        <div className="content-container mt-12">
          <p className="text-white text-lg sm:text-xl">{post.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
