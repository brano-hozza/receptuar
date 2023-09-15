import { post } from '@/server/models'
import { Post } from '~/types/post'

export default defineEventHandler(async () => {
  const posts = await post.find()
  return posts.map<Post>((p) => ({ id: p._id.toString(), name: p.name }))
})
