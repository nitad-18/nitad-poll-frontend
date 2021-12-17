<script lang="ts">
  import type { LoginRegisterMode } from './types'

  let currentMode: LoginRegisterMode = 'login'
  let username = ''
  let password = ''

  const modes: LoginRegisterMode[] = ['login', 'register']

  $: buttonText = currentMode === 'login' ? 'login' : 'register'

  const handleSubmit = () => {
    if (currentMode === 'login') {
      // login
    } else {
      // register
    }
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

  <form on:submit|preventDefault class="space-y-4">
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
