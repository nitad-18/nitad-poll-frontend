import { writable } from 'svelte/store'

const createLoginModalToggler = () => {
  const { subscribe, update, set } = writable(false)

  const toggle = () => {
    update((prev) => !prev)
  }

  return { subscribe, toggle, set }
}

const showLoginModal = createLoginModalToggler()
export default showLoginModal
