import { createConsola } from 'consola'

const consola = createConsola({
  defaults: {
    tag: 'SERVER:',
  },
})
export default defineEventHandler((event) => {
  consola.log(getRequestURL(event)?.pathname)
})
