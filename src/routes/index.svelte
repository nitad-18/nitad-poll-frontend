<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard.svelte'
  import type { SortMode } from '$lib/types'
  import pollStore from '../stores/PollStore'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'
  import axiosInstance from '../axios'

  let currentSortMode: SortMode = 'latest'

  const sortModes: SortMode[] = ['latest', 'popularity']
  const pollHandlers = {
    delete: async (e: CustomEvent<{ pollId: number }>) => {
      const { pollId } = e.detail
      if (await axiosInstance.deletePoll(pollId)) {
        pollStore.remove(pollId)
      }
    },
    close: async (e: CustomEvent<{ pollId: number }>) => {
      const { pollId } = e.detail
      if (await axiosInstance.closePoll(pollId)) {
        pollStore.close(pollId)
      }
    },
    vote: async (
      e: CustomEvent<{ pollId: number; optionId: number; option: string }>
    ) => {
      const { pollId, option, optionId } = e.detail
      if (await axiosInstance.vote(pollId, optionId)) {
        pollStore.vote(pollId, option, currentSortMode)
      }
    },
  }

  $: $pollStore && pollStore.sort(currentSortMode)
  $: openPolls = $pollStore.filter((p) => !p.isClose)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({openPolls.length})</h1>
  {#if openPolls.length}
    <span>Sort by:</span>
    {#each sortModes as mode}
      <button
        on:click={() => (currentSortMode = mode)}
        class="px-2 py-0 transition-colors"
        class:bg-rose-600={mode === currentSortMode}>{mode}</button
      >
    {/each}
  {/if}
</header>

{#if openPolls.length}
  {#each openPolls as poll (poll.id)}
    <div animate:flip={{ duration: 400 }}>
      <PollCard
        on:vote={pollHandlers.vote}
        on:close={pollHandlers.close}
        on:delete={pollHandlers.delete}
        {poll}
      />
    </div>
  {/each}
{:else}
  <div in:fade={{ delay: 400 }}><NoPollMessage /></div>
{/if}
