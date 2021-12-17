<script lang="ts">
  import LoginForm from './LoginForm.svelte'
  import type { LoginRegisterMode } from './types'

  let currentMode: LoginRegisterMode = 'login'

  const handlers = {
    login: (e: CustomEvent<{ username: string; password: string }>) => {
      console.log(e.detail)
    },
  }
</script>

<div class="space-y-8">
  <div>
    <button class="text-xl" class:text-blue-300={currentMode === 'login'}
      >login</button
    >
    <button class="text-xl" class:text-blue-300={currentMode === 'register'}
      >register</button
    >
  </div>

  {#if currentMode === 'login'}
    <LoginForm on:submit={handlers.login} />
  {:else}
    <!-- <RegisterForm> -->
  {/if}
</div>
