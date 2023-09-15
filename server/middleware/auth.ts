export default defineEventHandler((event) => {
  event.context.auth = {
    username: 'admin',
    password: 'admin',
  }
})
