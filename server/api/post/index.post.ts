import posts from "../../data/posts.json";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const name = body.name;

  if (!name) {
    return createError({ statusCode: 400, statusMessage: "Name is required" });
  }

  const highestId = Math.max(...posts.map((post) => post.id));
  const newPost = { id: highestId + 1, name };
  posts.push(newPost);

  return { data: newPost };
});
