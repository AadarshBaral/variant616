import { fetchPostById } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import Image from "next/image";
import { Suspense } from "react";

// Server-side function to fetch the post data
async function getPostData(slug: string): Promise<Post | null> {
  const post = await fetchPostById(slug);
  return post;
}

// Set the cache revalidation time
export const revalidate = 60; // Revalidate the page

type Params = Promise<{ slug: string }>;
export default async function Blog(props: { params: Params }) {
  const params = await props.params;
  const post = await getPostData(params.slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="relative h-auto">
        <div className="flex flex-1 justify-start items-center text-left flex-col w-[90%] sm:w-[70%] mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-4 self-start pb-10 pt-6 relative">
            {post.title}
          </h1>
          <div className="img-container rounded-xl padding-2">
            <Image
              src={post.headerImage}
              alt={post.title}
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
    </Suspense>
  );
}

// Loading Indicator Component
function LoadingIndicator() {
  return <p className="text-center text-xl mt-10">Loading...</p>;
}
