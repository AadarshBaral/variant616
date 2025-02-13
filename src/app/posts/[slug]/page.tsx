import { fetchPostById, fetchPostBySlug } from "@/config/firebaseConfig";
import Image from "next/image";
import Markdown from "react-markdown";
export const revalidate = 60;

type Params = Promise<{ slug: string }>;
export default async function Blog(props: { params: Params }) {
  const params = await props.params;
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return <p>Post not found</p>;
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
            alt={post.title}
            className="object-cover shadow-inner w-screen h-[35vh] sm:h-[60vh] rounded-xl"
            width={600}
            height={600}
          />
        </div>
        <div className="content-container mt-12 markdown ">
          <Markdown className="text-white prose-h1:text-foreground prose-headings:text-foreground prose-strong:text-white prose-neutral prose lg:prose-lg">
            {post.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
