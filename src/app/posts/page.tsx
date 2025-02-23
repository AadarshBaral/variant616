import { fetchPostsByCategory } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import PostClient from "@/app/posts/PostClient";

type Params = Promise<{ category: string }>;
export default async function PostsServer(props: { params: Params }) {
  const params = await props.params;
  const selectedCateogory = params.category || "all";
  const posts: Post[] = await fetchPostsByCategory(selectedCateogory);
  return (
    <PostClient initialPosts={posts} selectedCategory={selectedCateogory} />
  );
}
