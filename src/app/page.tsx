import React from "react";
import Expandable from "./components/Expandable";
import Main from "./components/Main";
import MovieBlogCard from "./components/MovieBlogCard";
import { AppleCardsCarouselDemo } from "./components/CardCarousel";
import { fetchPosts } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
async function HomePage() {
  const posts: Post[] = await fetchPosts();
  console.log(posts);
  return (
    <Main>
      <Expandable />
      <AppleCardsCarouselDemo />
      <h1 className="text-6xl text-foreground ml-6">Blog</h1>
      <div className="blogContainer grid grid-cols-1 sm:grid-cols-2  place-items-center h-full w-[95%] gap-0 sm:gap-10 mx-auto mt-10">
        <MovieBlogCard
          image="/images/horror.png"
          title="Haloween movies you must watch"
          id="1"
        />
        {posts.map((post) => (
          <MovieBlogCard
            key={post.id}
            image={post.headerImage}
            id={post.id}
            title={post.title}
          />
        ))}
      </div>
    </Main>
  );
}

export default HomePage;
