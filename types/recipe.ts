export interface Recipe {
  id: number
  name: string
  ingredients: {
    id: number
    name: string
    amount: number
    unit: 'kg' | 'g' | 'l' | 'pcs'
  }[]
  instructions: string
}
