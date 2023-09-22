// eslint-disable-next-line import/default
import pg from 'pg'
import { getRecipeById } from '~/server/repositories/recipe'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const pool = new pg.Pool()
  const recipe = await getRecipeById(pool, Number(id))
  await pool.end()

  return recipe
})
