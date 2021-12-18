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
      class="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-4xl xl:max-w-5xl"
    >
      <slot />
    </main>
  </div>
{/key}
