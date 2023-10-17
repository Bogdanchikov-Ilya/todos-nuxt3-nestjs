<template>
  <div>
    (Default) Лэйаут на всех страницах
    <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      logout
    </button>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import {useCookie} from "#app";
const router = useRouter();
const logout = () => {
  const token = useCookie('token');
  token.value = null
  router.push('/login')
}
</script>