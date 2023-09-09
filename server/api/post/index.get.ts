import posts from "../../data/posts.json";
type Post = {
  id: number;
  name: string;
};
export default defineEventHandler(() => ({ data: posts as Post[] }));
