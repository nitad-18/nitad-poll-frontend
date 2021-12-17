<script lang="ts">
  import { fly } from 'svelte/transition'

  export let currentPath: string

  const transitionDur = 200
  const y = -20
</script>

<!-- https://svelte.dev/docs#template-syntax-key -->
{#key currentPath}
  <div class="absolute w-full">
    <main
      in:fly={{ delay: transitionDur, y }}
      out:fly={{ duration: transitionDur, y }}
      class="mx-14 md:mx-32 lg:mx-80"
    >
      <slot />
    </main>
  </div>
{/key}
