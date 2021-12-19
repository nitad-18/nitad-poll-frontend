<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard.svelte'
  import type { SortMode } from '$lib/types'
  import pollStore from '../stores/PollStore'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'

  let currentSortMode: SortMode = 'latest'

  const sortModes: SortMode[] = ['latest', 'popularity']
  const pollHandlers = {
    delete: (e: CustomEvent<{ pollId: number }>) =>
      pollStore.remove(e.detail.pollId),
    close: (e: CustomEvent<{ pollId: number }>) =>
      pollStore.close(e.detail.pollId),
    vote: (e: CustomEvent<{ pollId: number; option: string }>) =>
      pollStore.vote(e.detail.pollId, e.detail.option, currentSortMode),
  }

  $: pollStore.sort(currentSortMode)
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
