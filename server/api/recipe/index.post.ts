// eslint-disable-next-line import/default
import pg from 'pg'
import { createRecipe } from '~/server/repositories/recipe'

export default defineEventHandler(async (event) => {
  // Get body params
  const { name, ingredients } = await readBody<{
    name: string
    ingredients: {
      grocery_id: number
      amount: number
      unit: 'kg' | 'g' | 'l' | 'pcs'
    }[]
    instructions: string
  }>(event)

  const pool = new pg.Pool()

  const newRecipe = await createRecipe(pool, name, ingredients)
  await pool.end()

  return newRecipe
})
