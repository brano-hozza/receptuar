import { createConsola } from 'consola'
// eslint-disable-next-line import/default
import pg from 'pg'

const consola = createConsola({ defaults: { tag: 'RECIPE:' } })
export default defineEventHandler(async () => {
  const pool = new pg.Pool()

  const { rows: groceries } = await pool.query(
    'INSERT INTO groceries (name) VALUES ($1), ($2) RETURNING grocery_id',
    ['milk', 'oats']
  )

  const { rows: recipes } = await pool.query(
    'INSERT INTO recipes (name) VALUES ($1) RETURNING recipe_id',
    ['test']
  )
  const recipeId = recipes[0].recipe_id
  consola.log(recipeId)

  const { rows } = await pool.query(
    'INSERT INTO recipes__groceries (recipe_id, grocery_id, amount, unit) VALUES ($1, $2, $3, $4), ($1, $5, $6, $7) RETURNING *',
    [recipeId, groceries[0].grocery_id, 1, 'l', groceries[1].grocery_id, 2, 'g']
  )

  consola.log(rows)
  return rows
})
