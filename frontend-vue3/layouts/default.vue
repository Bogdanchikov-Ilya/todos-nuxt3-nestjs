<script lang="ts" setup>
import {useCookie} from "#app";
const router = useRouter();
const logout = () => {
  const token = useCookie('token');
  token.value = null
  router.push('/login')
}
</script>
<template>

  <div>
    <header class="flex justify-between container mx-auto px-20 border-b-2 py-3">
      <nuxt-link to="/profile" class="user flex items-center gap-2">
        <img src="23222.png" alt="" class="rounded-full w-12">
        <span class="name text-2xl font-bold">Тест</span>
      </nuxt-link>
      <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        logout
      </button>
    </header>
    <slot />
  </div>
</template>
