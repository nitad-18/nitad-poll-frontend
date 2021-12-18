<script context="module" lang="ts">
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
  import Modal from '$lib/Modal.svelte'
  import Nav from '$lib/Nav.svelte'
  import PageTransition from '$lib/PageTransition.svelte'
  import type { PagePathDetail } from '$lib/types'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import '../app.css'
  import LoginRegisterForm from '$lib/LoginRegisterForm.svelte'
  import axiosInstance from '../axios'
  import user from '../stores/userStore'

  export let currentPath: string

  let checkedMe = false

  const paths: PagePathDetail[] = [
    { name: 'Current Polls', path: '/' },
    { name: 'Create Poll', path: '/create' },
    { name: 'Closed Polls', path: '/closed' },
  ]

  onMount(async () => {
    // prefetch all routes to speed up subsequent page navigation.
    // https://kit.svelte.dev/docs#modules-$app-navigation
    // pollStore.set(polls)
    prefetchRoutes()
    // check if user is already logged in
    const userData = await axiosInstance.checkMe().catch(() => null)
    user.set(userData)
    checkedMe = true
    if (userData) {
      await axiosInstance.getPolls()
    }
  })
</script>

{#if checkedMe && !$user}
  <div transition:fade={{ duration: 500 }}>
    <Modal enableClose={false}>
      <LoginRegisterForm />
    </Modal>
  </div>
{/if}

<Header />

<Nav {currentPath} {paths} />

{#if $user}
  <PageTransition {currentPath}>
    <slot />
  </PageTransition>
{/if}
