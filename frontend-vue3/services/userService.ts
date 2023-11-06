import { useMyFetch } from "~/composables/useMainApi";
import { useCookie } from "#app";

export async function getUser(id: number) {
  const token = useCookie('token');
  const config = useRuntimeConfig()
  try {
    const res = await $fetch(`${config.public.baseURL}api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    return res
  } catch(e) {
    console.log(e);
    throw e
  }
}