export interface Post {
  id: string;
  title: string;
  slug: stirng;
  headerImage: string;
  featured: boolean;
  heroFeatured: boolean;
  content: string;
  category: string[];
  date: string;
  author: string;
  likes: number;
}
