import { createConsola } from 'consola'
import { post } from '~/server/models'
import { Post } from '~/types/post'

const consola = createConsola({ defaults: { tag: 'POST:' } })

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const _post = await post.findById(id)

  if (!_post) {
    throw createError({ statusCode: 404 })
  }
  try {
    const { name } = await readBody(event)

    _post.name = name

    await _post.save()

    return { id: _post._id.toString(), name: _post.name } as Post
  } catch (e) {
    consola.error(e)
    throw createError({ statusCode: 400 })
  }
})
