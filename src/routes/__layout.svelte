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
  import Header from '$lib/Header.svelte'
  import Nav from '$lib/Nav.svelte'
  import PageTransition from '$lib/PageTransition.svelte'
  import type { PagePathDetail } from '$lib/types'
  import { onMount } from 'svelte'
  import '../app.css'

  export let currentPath: string

  const paths: PagePathDetail[] = [
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

<Header />

<Nav {currentPath} {paths} />

<PageTransition {currentPath}>
  <slot />
</PageTransition>
