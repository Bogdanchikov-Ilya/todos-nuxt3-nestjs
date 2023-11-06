<template>
  <form class="flex justify-center items-center flex-col border w-fit mx-auto py-10 px-10 rounded gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <label>Email</label>
        <input type="text" class="border px-1.5 py-1 rounded focus:outline-none" placeholder="Email" v-model="email">
      </div>
    <div class="flex flex-col">
      <label>Пароль</label>
      <input type="password" class="border px-1.5 py-1 rounded focus:outline-none" placeholder="Пароль" v-model="password">
    </div>
    <p class="text-red-600" v-if="showError">Неверный логин или пароль</p>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Войти</button>
  </form>
</template>
<script setup lang="ts">
import {useCookie} from "#app";

definePageMeta({
  layout: "login-layout",
});
const router = useRouter();
import { useLoginStore } from '@/stores/login'
import * as authService from '@/services/authService'

const email = ref<string>('')
const password = ref<string>('')
const showError = ref<boolean>(false)
const loginStore = useLoginStore()
const onSubmit = async () => {
  const res  = await authService.login(email.value, password.value)

  if(!res?.value?.access_token) {
    showError.value = true
    return
  }
  const token = useCookie('token')
  token.value = res.value.access_token
  // loginStore.setUser(token)

  // function parseJwt (token) {
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //
  //   return JSON.parse(jsonPayload);
  // }

  // loginStore.setUser(parseJwt(token.value))



  await router.push('/')
}
</script>