import {defineStore} from "pinia";
import {LoginUserItemModel} from '@/models/loginUserItem.model'
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0 as number,
    name: 'Eduardo' as String,
    loginUser: null as LoginUserItemModel | null
  }),
  actions: {
    getTest() {
      const {data} = useFetch('https://jsonplaceholder.typicode.com/todos')
      return data
    },
    login(data: LoginUserItemModel):void {
      this.loginUser = data
    },
    increment(value:number) {
      this.count+=value
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    getLoginUser: (state) => state.loginUser
  },
})