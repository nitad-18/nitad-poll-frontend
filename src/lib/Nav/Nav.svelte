<script lang="ts">
  // path is recieved from the script above
  export let currentPath: string
  export let paths: { name: string; path: string }[]
  console.log(currentPath)
</script>

<nav class="flex justify-center space-x-7 my-8">
  {#each paths as path}
    <a
      href={path.path}
      class:hover:text-gray-300={path.path !== currentPath}
      class:text-blue-300={path.path === currentPath}>{path.name}</a
    >
  {/each}
</nav>

<style>
  a {
    @apply text-xl font-semibold 
        transition-colors;
  }
</style>
