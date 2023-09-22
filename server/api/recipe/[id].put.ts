// eslint-disable-next-line import/default
import pg from 'pg'
import { updateRecipe } from './../../repositories/recipe'

export default defineEventHandler(async (event) => {
  // Get id
  const id = getRouterParam(event, 'id')
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
  const recipe = await updateRecipe(pool, Number(id), name, ingredients)
  await pool.end()

  return recipe
})
