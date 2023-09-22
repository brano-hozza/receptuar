// eslint-disable-next-line import/default
import pg from 'pg'
import { getAllRecipes } from '~/server/repositories/recipe'

export default defineEventHandler(async () => {
  const pool = new pg.Pool()

  const recipes = await getAllRecipes(pool)
  await pool.end()

  return recipes
})
