import {useMyFetch} from "~/composables/useMainApi";
export async function login(email: string, password: string) {
  try {
    const {data} = await useMyFetch('api/auth/login', {
      method: 'POST',
      body: {
        email, password
      }
    })
    return data
  } catch (e: any) {
    return e
  }
}