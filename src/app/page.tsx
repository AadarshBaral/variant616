import React from "react";
import Expandable from "./components/Expandable";
import Main from "./components/Main";
import MovieBlogCard from "./components/MovieBlogCard";
import { AppleCardsCarouselDemo } from "./components/CardCarousel";
import { fetchPosts } from "@/config/firebaseConfig";
import { Post } from "@/utils/types";
import Link from "next/link";
async function HomePage() {
  const posts: Post[] = await fetchPosts();
  const filterByHero = posts
    .filter((post) => post.heroFeatured === true)
    .map(({ id, headerImage, title, slug }) => ({
      id,
      headerImage,
      title,
      slug,
    }));
  return (
    <Main>
      <Expandable list={filterByHero.slice(0, 3)} />
      <AppleCardsCarouselDemo />
      <div className="blog-header-container w-full flex justify-between items-center">
        <h1 className="text-6xl text-foreground ml-6">Blog</h1>
        <Link
          href={"/posts"}
          className="text-3xl text-foreground/40 mr-6 underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      <div className="blogContainer grid grid-cols-1 sm:grid-cols-2  place-items-center h-full w-[95%]  sm:gap-10 mx-auto mt-10 ">
        {posts.map((post) => (
          <MovieBlogCard
            key={post.id}
            image={post.headerImage}
            slug={post.slug}
            id={post.id}
            title={
              post.title.length > 50
                ? post.title.slice(0, 50) + "..."
                : post.title
            }
          />
        ))}
      </div>
    </Main>
  );
}

export default HomePage;
