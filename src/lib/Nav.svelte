<script lang="ts">
  import user from '../stores/userStore'
  import showLoginModal from '../stores/loginModalToggler'
  import type { PagePathDetail } from './types'
  import axios from 'axios'

  // path is recieved from the script above
  export let currentPath: string
  export let paths: PagePathDetail[]

  $: buttonText = $user !== null ? 'Logout' : 'Login'


  // create axios instance
  const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true,
  })

  const handleButtonClick = async () => {
    if ($user) {
      // const response = await axios.post('http://localhost:4000/auth/logout', {
      //   withCredentials: true,
      // })
      const response = await instance.get('http://localhost:4000/polls')
      // const response = await fetch('http://localhost:4000/auth/logout', {
      //   method: 'DELETE',
      // })
      if (response.status === 204) {
        user.set(null)
        showLoginModal.toggle()
      }
    }
  }
</script>

<nav class="flex justify-center space-x-7 my-8 items-center">
  <h1 class="hidden">navigation bar</h1>
  {#each paths as path}
    <a
      href={path.path}
      class:hover:text-gray-300={path.path !== currentPath}
      class:!text-blue-300={path.path === currentPath}>{path.name}</a
    >
  {/each}
  <button on:click={handleButtonClick} class="btn-primary">{buttonText}</button>
</nav>

<style>
  a {
    @apply text-xl font-semibold text-gray-100
        transition-colors no-underline;
  }
</style>
