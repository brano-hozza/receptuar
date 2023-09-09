import posts from "../../data/posts.json";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return createError({ statusCode: 404 });
  }

  return { data: post };
});
