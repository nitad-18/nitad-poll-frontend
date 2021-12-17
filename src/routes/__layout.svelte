<script context="module">
  // This is how we get the current path.
  // https://kit.svelte.dev/docs#loading
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page }) {
    return {
      props: {
        currentPath: page.path,
      },
    }
  }
</script>

<script lang="ts">
  import { prefetchRoutes } from '$app/navigation'
  import Nav from '$lib/Nav.svelte'
  import PageTransition from '$lib/PageTransition.svelte'
  import { onMount } from 'svelte'
  import '../app.css'

  export let currentPath: string

  const paths = [
    { name: 'Current Polls', path: '/' },
    { name: 'Create Poll', path: '/create' },
    { name: 'Closed Polls', path: '/closed' },
  ]

  onMount(() => {
    // prefetch all routes to speed up subsequent page navigation.
    // https://kit.svelte.dev/docs#modules-$app-navigation
    prefetchRoutes()
  })
</script>

<header
  class="flex justify-center items-center 
		flex-col py-10 bg-slate-800"
>
  <img class="w-28" src="/favicon.svg" alt="NITAD Poll icon" />
  <h1 class="text-3xl font-bold tracking-widest">NITAD Poll</h1>
</header>

<Nav {currentPath} {paths} />

<PageTransition {currentPath}>
  <slot />
</PageTransition>
