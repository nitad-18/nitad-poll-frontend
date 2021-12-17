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

