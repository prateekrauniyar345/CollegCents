import { reactive } from 'vue'


const state = reactive({
  account: null,
  currentUser: null,
})

export function setAccount(account) {
  state.account = account
}

export function clearAccount() {
  state.account = null
}

export function clearCurrentUser() {
  state.currentUser = null
}


export function setCurrentUser(user) {
  state.currentUser = user
}


export default state
