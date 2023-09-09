<template>
  <div>
    <h1 class="text-lg">Post</h1>
    <span v-if="pending">Loading...</span>

    <span v-else-if="data">
      Post: {{ data.data?.name }}-{{ data.data?.id }}
    </span>

    <span v-else-if="error">Error: {{ error }}</span>

    <br /><button @click="() => refresh()">Refresh</button> <br />
    <nuxt-link to="/">Back</nuxt-link>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();

const { data, pending, error, refresh } = await useFetch(
  `/api/post/${route.params.id}`,
);
// if(data.value)
</script>
