<template>
  <div>
    <!--App header-->
    <header class="header">
      <h1 class="text-lg">My App</h1>
      <ul class="nav">
        <li
          v-for="option in pathOptions"
          :key="option.path"
          :class="{ selected: currentPath === option.path }"
          class="nav-item"
          @click="$router.push(option.path)"
        >
          {{ option.name }}
        </li>
      </ul>
    </header>
    <!--App content-->
    <main>
      <slot />
    </main>
    <!--App footer-->
    <footer>
      <p>Footer</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
const pathOptions = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

const route = useRoute()

const currentPath = computed(() => route.path)
</script>
<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  height: 5vh;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    .nav-item {
      margin-right: 10px;
      cursor: pointer;
      &.selected {
        color: rgb(116, 116, 255);
      }
    }
  }
}
main {
  padding: 10px;
  height: 90vh;
}
footer {
  height: 5vh;
  padding: 10px;
  background-color: #000;
  color: #fff;
  text-align: center;
}
</style>
