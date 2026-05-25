import { reactive } from 'vue'


const state = reactive({
  account: null,
})

export function setAccount(account) {
  state.account = account
}

export function clearAccount() {
  state.account = null
}

export default state
