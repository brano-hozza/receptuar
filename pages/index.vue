<template>
  <div>
    <h1 class="text-lg">Posts</h1>
    <span v-if="pending">Loading...</span>

    <span v-else-if="data">
      <ul>
        <li v-for="item in data.data" :key="item.id">
          <nuxt-link :to="`post/${item.id}`">{{ item.name }}</nuxt-link>
        </li>
      </ul>
    </span>

    <span v-else-if="error">Error: {{ error }}</span>

    <button @click="() => refresh()">Refresh</button>
  </div>
</template>
<script lang="ts" setup>
const { data, pending, refresh, error } = await useFetch("/api/post");
</script>
