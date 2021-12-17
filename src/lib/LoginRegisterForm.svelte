<script lang="ts">
  import showLoginModal from '../stores/loginModalToggler'
  import user from '../stores/userStore'
  import type { LoginRegisterMode } from './types'
  import axios from "axios"

  let currentMode: LoginRegisterMode = 'login'
  let username = ''
  let password = ''

  const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true,
  })

  const modes: LoginRegisterMode[] = ['login', 'register']

  $: buttonText = currentMode === 'login' ? 'login' : 'register'

  const login = async () => {
    const response = await instance.post(
      'http://localhost:4000/auth/login',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    const data = await response.data
    if (response.status === 200) {
      user.set(data)
      showLoginModal.toggle()
      return
    }
    alert('failed to login')
  }

  const handleSubmit = async () => {
    if (currentMode === 'login') {
      await login()
      return
    }
    // register
    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        displayName: Math.random().toString(),
      }),
    })
    if (response.ok) {
      // success
      currentMode = 'login'
      alert('registered successfully')
      return
    }
    alert('failed to register')
  }
</script>

<div class="space-y-8">
  <div>
    {#each modes as mode}
      <button
        on:click={() => (currentMode = mode)}
        class="text-xl"
        class:text-blue-300={currentMode === mode}>{mode}</button
      >
    {/each}
  </div>

  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <label>
      <span>username</span>
      <input
        bind:value={username}
        placeholder="username"
        type="text"
        autocomplete="false"
        required
      />
    </label>
    <label>
      <span>password</span>
      <input
        bind:value={password}
        placeholder="password"
        type="password"
        autocomplete="false"
        required
      />
    </label>
    <button type="submit" class="btn-primary">{buttonText}</button>
  </form>
</div>

<style>
  input {
    @apply w-[36ch];
  }
  label {
    @apply block font-semibold space-x-4;
  }
</style>
