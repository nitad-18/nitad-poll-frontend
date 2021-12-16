<script lang="ts">
  import { fade, slide } from 'svelte/transition'

  export let currentPath: string

  const transitionDur = 200
</script>

<!-- https://svelte.dev/docs#template-syntax-key -->
{#key currentPath}
  <main
    out:fade={{ duration: transitionDur - 5 }}
    in:slide={{ delay: transitionDur }}
    class="mx-14 md:mx-32 lg:mx-80"
  >
    <slot />
  </main>
{/key}
