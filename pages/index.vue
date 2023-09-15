<template>
  <div>
    <h1 class="text-lg">Posts</h1>
    <span v-if="pending">Loading...</span>

    <ul v-else-if="resData" class="border-black border-2 w-[200px]">
      <li
        v-for="item in resData"
        :key="item.id"
        class="border-b-2 border-black m-2 cursor-pointer"
        @click="() => $router.push(`/post/${item.id}`)"
      >
        {{ item.name }}
      </li>
    </ul>
    <span v-else-if="error">Error: {{ error }}</span>

    <button @click="() => refresh()">Refresh</button>
    <hr />
    <input v-model="newName" type="text" />
    <button @click="add">Add</button>
  </div>
</template>
<script lang="ts" setup>
const { data: resData, pending, refresh, error } = await useFetch('/api/post')

const newName = ref('')
const add = async () => {
  try {
    await useFetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ name: newName.value }),
    })
    newName.value = ''
    refresh()
  } catch (e) {
    console.log(e)
  }
}
</script>
<style>
input {
  border: 2px solid black;
  width: 200px;
}
</style>
