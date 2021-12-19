<script lang="ts">
  import axiosInstance from '../axios'
  import user from '../stores/userStore'
  import type { LoginRegisterMode } from './types'

  let currentMode: LoginRegisterMode = 'login'
  let username = ''
  let password = ''

  const modes: LoginRegisterMode[] = ['login', 'register']

  $: buttonText = currentMode === 'login' ? 'login' : 'register'

  const login = async () => {
    const userData = await axiosInstance.login(username, password)
    if (userData) {
      user.set(userData)
      await axiosInstance.getPolls()
      return
    }
    alert('failed to login')
  }

  const registerAndLogin = async () => {
    if (await axiosInstance.register(username, password)) {
      await login()
      return
    }
    alert('failed to register')
  }

  const handleSubmit = async () => {
    if (currentMode === 'login') {
      await login()
      return
    }
    await registerAndLogin()
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
