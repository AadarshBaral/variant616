import { fetchPostsByCategory } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import PostClient from "@/app/posts/PostClient";
export default async function PostsServer({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCateogory = searchParams.category || "all";
  const posts: Post[] = await fetchPostsByCategory(selectedCateogory);
  return (
    <PostClient initialPosts={posts} selectedCategory={selectedCateogory} />
  );
}
