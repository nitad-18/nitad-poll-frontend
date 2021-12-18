<script context="module" lang="ts">
  // This is how we get the current path.
  // https://kit.svelte.dev/docs#loading
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page }) {
    await axiosInstance.getPolls()
    return {
      props: {
        currentPath: page.path,
        // polls,
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
  import type { PagePathDetail, PollDetail } from '$lib/types'
  import showLoginModal from '../stores/loginModalToggler'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import '../app.css'
  import LoginRegisterForm from '$lib/LoginRegisterForm.svelte'
  import axiosInstance from '../axios'
  import user from '../stores/userStore'
  import pollStore from '../stores/PollStore'

  export let currentPath: string
  // export let polls: PollDetail[]

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
    const userData = await axiosInstance.checkMe().catch((res) => null)
    user.set(userData)
    if (!userData) {
      showLoginModal.set(true)
    }
  })
</script>

{#if $showLoginModal}
  <div transition:fade={{ duration: 500 }}>
    <Modal on:close={showLoginModal.toggle}>
      <LoginRegisterForm />
    </Modal>
  </div>
{/if}

<Header />

<Nav {currentPath} {paths} />

<PageTransition {currentPath}>
  <slot />
</PageTransition>
