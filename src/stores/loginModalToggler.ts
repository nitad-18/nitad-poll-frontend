import { writable } from 'svelte/store'

const createLoginModalToggler = () => {
  const { subscribe, update } = writable(false)

  const toggle = () => {
    update((prev) => !prev)
  }

  return { subscribe, toggle }
}

const showLoginModal = createLoginModalToggler()
export default showLoginModal
