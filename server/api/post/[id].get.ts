import { Post } from '@/types/post'
import { post } from '~/server/models'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const _post = await post.findById(id)

  if (!_post) {
    throw createError({ statusCode: 404 })
  }

  return { id: _post._id.toString(), name: _post.name } as Post
})
