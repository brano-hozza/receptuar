<template>
  <div>
    <span class="underline cursor-pointer" @click="$router.back()">
      &#60;&#60;Back
    </span>
    <h1 class="text-4xl">Post</h1>
    <span v-if="pending">Loading...</span>

    <span v-else-if="resData" class="dataField">
      <span class="underline">Id: {{ resData?.id }}</span>
      <label for="postField">Post:</label>
      <input
        v-model="name"
        name="postField"
        class="border-2 border-black w-[200px]"
        type="text"
      />
      <span class="flex flex-row justify-between w-[200px] mt-2">
        <button class="border-2 border-blue-500 w-[70px]" @click="save">
          Save
        </button>
        <button class="border-2 border-black w-[70px]" @click="() => refresh()">
          Refresh
        </button>
      </span>
    </span>

    <span v-else-if="error">Error: {{ error }}</span>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()

const postId = route.params.id as string

const {
  data: resData,
  pending,
  error,
  refresh,
} = await useFetch(`/api/post/${postId}`)

const name = ref(resData?.value?.name)

watch(resData, (val) => {
  if (val) {
    name.value = val.name
  }
})

const save = async () => {
  try {
    await useFetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ name: name.value }),
    })
  } catch (e) {
    console.log(e)
  }
}
</script>
<style lang="scss" scoped>
.dataField {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  input {
    margin-top: 10px;
  }
}
</style>
