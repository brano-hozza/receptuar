// eslint-disable-next-line import/default
import pg from 'pg'
import { Recipe } from '~/types/recipe'

export const getAllRecipes = async (pool: pg.Pool) => {
  const { rows: recipes } = await pool.query(`
  SELECT r.recipe_id, r.name, json_agg(json_build_object('id', g.grocery_id, 'name', g.name, 'amount', rg.amount, 'unit', rg.unit)) AS groceries
  FROM recipes r
  LEFT JOIN recipes__groceries rg USING(recipe_id)
  LEFT JOIN groceries g USING(grocery_id)
  GROUP BY r.recipe_id
  `)
  return recipes as Recipe[]
}

export const getRecipeById = async (pool: pg.Pool, recipeId: number) => {
  const { rows: recipes } = await pool.query(
    `
    SELECT r.recipe_id, r.name, json_agg(json_build_object('id', g.grocery_id, 'name', g.name, 'amount', rg.amount, 'unit', rg.unit)) AS groceries
    FROM recipes r
    LEFT JOIN recipes__groceries rg USING(recipe_id)
    LEFT JOIN groceries g USING(grocery_id)
    WHERE r.recipe_id = $1
    GROUP BY r.recipe_id
    `,
    [recipeId]
  )
  return recipes[0] as Recipe
}

export const createRecipe = async (
  pool: pg.Pool,
  name: string,
  ingredients: {
    grocery_id: number
    amount: number
    unit: 'kg' | 'g' | 'l' | 'pcs'
  }[]
) => {
  const { rows: recipes } = await pool.query(
    'INSERT INTO recipes (name) VALUES ($1) RETURNING recipe_id',
    [name]
  )
  const recipeId = recipes[0].recipe_id

  // Calculate the amount of rows to insert
  const rowsToInsert = ingredients.length

  // Create an array of placeholders for the query
  const placeholders = []
  for (let i = 1; i <= rowsToInsert; i++) {
    placeholders.push(
      `($${i * 4 - 3}, $${i * 4 - 2}, $${i * 4 - 1}, $${i * 4})`
    )
  }

  await pool.query(
    `INSERT INTO recipes__groceries (recipe_id, grocery_id, amount, unit) VALUES ${placeholders.join(
      ' '
    )} RETURNING *`,
    ingredients.map((ingredient) => [
      recipeId,
      ingredient.grocery_id,
      ingredient.amount,
      ingredient.unit,
    ])
  )

  return recipes[0] as Recipe
}

export const updateRecipe = async (
  pool: pg.Pool,
  recipeId: number,
  name: string,
  ingredients: {
    grocery_id: number
    amount: number
    unit: 'kg' | 'g' | 'l' | 'pcs'
  }[]
) => {
  const { rows: recipes } = await pool.query(
    'UPDATE recipes SET name = $1 WHERE recipe_id = $2 RETURNING recipe_id',
    [name, recipeId]
  )

  // Fix the ingredients
  await pool.query('DELETE FROM recipes__groceries WHERE recipe_id = $1', [
    recipeId,
  ])

  // Calculate the amount of rows to insert
  const rowsToInsert = ingredients.length

  // Create an array of placeholders for the query
  const placeholders = []
  for (let i = 1; i <= rowsToInsert; i++) {
    placeholders.push(
      `($${i * 4 - 3}, $${i * 4 - 2}, $${i * 4 - 1}, $${i * 4})`
    )
  }

  await pool.query(
    `INSERT INTO recipes__groceries (recipe_id, grocery_id, amount, unit) VALUES ${placeholders.join(
      ' '
    )} RETURNING *`,
    ingredients.map((ingredient) => [
      recipeId,
      ingredient.grocery_id,
      ingredient.amount,
      ingredient.unit,
    ])
  )

  return recipes[0] as Recipe
}
