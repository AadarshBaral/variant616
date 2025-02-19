import { fetchPostBySlug } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Markdown from "react-markdown";
import FloatingSidebar from "@/app/components/FloatingSidebar";
// Revalidate every 60 seconds
export const revalidate = 60;

// Define the params interface
interface Props {
  params: Promise<{ slug: string }>;
}

// Metadata generation function
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await fetchPostBySlug(slug);
  console.log(post);
  console.log(parent);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.content,
    openGraph: {
      title: post.title,
      description: post.content,
      images: [post.headerImage],
      type: "article",
      url: `https://variant616.vercel.app/posts/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content,
      images: [post.headerImage],
    },
  };
}

export default async function Blog({ params }: Props) {
  const slug = (await params).slug;
  const post: Post | null = await fetchPostBySlug(slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="  relative mb-32">
      <FloatingSidebar className="cont fixed bottom-4  left-[50%] translate-x-[-50%] z-10 " />
      <div className="cont h-full ">
        <div className="flex flex-1 justify-start items-center text-left flex-col w-[90%] sm:w-[70%] mx-auto ">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mt-4 self-start pb-10 pt-6 ">
            {post.title}
          </h1>
          <div className="img-container rounded-xl padding-2 ">
            <Image
              src={post.headerImage}
              alt={post.title}
              className="object-cover shadow-inner w-screen h-[35vh] sm:h-[60vh] rounded-xl"
              width={600}
              height={600}
            />
          </div>
          <div className="content-container mt-12 markdown ">
            <Markdown className="text-white prose-h1:text-foreground prose-headings:text-foreground prose-strong:text-white prose-neutral prose lg:prose-lg ">
              {post.content}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
