<template>
  <div class="profile container mx-auto">123231</div>
  <div>{{ userData }}</div>
  <div>{{ loginStore.getAuthUser  }}</div>
  <span>{{userId}}</span>
</template>
<script setup lang="ts">
import * as userService from '@/services/userService'
import { useLoginStore } from '@/stores/login'
import {useCookie} from "#app";
// import {a} from "unplugin-vue-router/dist/options-56006a88";
// import {awsLambda} from "nitropack/dist/shared/nitro.f34e6224";
const loginStore = useLoginStore()
const userId = ref(null)
// const userData = ref(null)
const userData = ref(null)

onMounted(async () => {
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  const token = useCookie('token');
  userId.value = parseJwt(token.value).id
  userData.value = await userService.getUser(parseJwt(token.value).id)
})

// watch(userId, (newId) => {
//   userData.value = userService.getUser(newId)
// })

</script>