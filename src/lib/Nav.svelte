<script lang="ts">
  import type { PagePathDetail } from './types'

  // path is recieved from the script above
  export let currentPath: string
  export let paths: PagePathDetail[]
</script>

<nav class="flex justify-center space-x-7 my-8">
  <h1 class="hidden">navigation bar</h1>
  {#each paths as path}
    <a
      href={path.path}
      class:hover:text-gray-300={path.path !== currentPath}
      class:!text-blue-300={path.path === currentPath}>{path.name}</a
    >
  {/each}
</nav>

<style>
  a {
    @apply text-xl font-semibold text-gray-100
        transition-colors no-underline;
  }
</style>
