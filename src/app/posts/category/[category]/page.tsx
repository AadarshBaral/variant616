import { fetchPostsByCategory } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import PostClient from "@/app/posts/PostClient";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function PostsServer({ params }: Props) {
  const category = (await params).category;
  const selectedCateogory = category || "all";
  const posts: Post[] = await fetchPostsByCategory(selectedCateogory);
  return (
    <PostClient initialPosts={posts} selectedCategory={selectedCateogory} />
  );
}
