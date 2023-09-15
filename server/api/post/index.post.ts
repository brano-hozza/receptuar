import { post } from '~/server/models'
import { Post } from '~/types/post'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = body.name

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required' })
  }

  const newPost = await post.create({ name })

  return { id: newPost._id.toString(), name: newPost.name } as Post
})
