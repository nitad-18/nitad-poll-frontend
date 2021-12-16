<script context="module">
  // This is how we get the current path.
  // https://kit.svelte.dev/docs#loading
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page }) {
    return {
      props: {
        currentPath: page.path,
        paths: [
          { name: 'Current Polls', path: '/' },
          { name: 'Create Poll', path: '/create' },
          { name: 'Closed Polls', path: '/closed' },
        ],
      },
    }
  }
</script>

<script lang="ts">
  import Nav from '$lib/Nav/Nav.svelte'
  import '../app.css'

  export let currentPath: string
  export let paths: { name: string; path: string }[]
</script>

<header
  class="flex justify-center items-center 
		flex-col py-10 bg-slate-800"
>
  <svg
    class="w-28"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 448 512"
    ><path
      d="M448 432V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48zM112 192c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h128c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16H112zm0 96c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h224c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16H112zm0 96c-8.84 0-16-7.16-16-16v-32c0-8.84 7.16-16 16-16h64c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-64z"
      fill="currentColor"
    /></svg
  >
  <span class="text-3xl font-bold tracking-widest">NITAD Poll</span>
</header>

<Nav {currentPath} {paths} />

<main class="mx-14 md:mx-32 lg:mx-80">
  <slot />
</main>

<style>
</style>
