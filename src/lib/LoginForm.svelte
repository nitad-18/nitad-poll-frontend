<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let username = ''
  let password = ''

  const dispatch = createEventDispatcher<{
    submit: { username: string; password: string }
  }>()

  const emitSubmit = () => {
    dispatch('submit', { username, password })
    username = password = ''
  }
</script>

<form on:submit|preventDefault={emitSubmit} class="space-y-4">
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
  <button type="submit" class="btn-primary">login</button>
</form>

<style>
  input {
    @apply w-[36ch];
  }
  label {
    @apply block font-semibold space-x-4;
  }
</style>
