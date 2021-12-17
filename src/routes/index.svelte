<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import type { SortMode } from '$lib/types'
  import pollStore from '../stores/PollStore'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'

  let currentSortMode: SortMode = 'latest'

  const sortModes: SortMode[] = ['latest', 'popularity']
  const pollHandlers = {
    delete: (e: CustomEvent<{ pollId: string }>) =>
      pollStore.remove(e.detail.pollId),
    close: (e: CustomEvent<{ pollId: string }>) =>
      pollStore.close(e.detail.pollId),
    vote: (e: CustomEvent<{ pollId: string; option: string }>) =>
      pollStore.vote(e.detail.pollId, e.detail.option, currentSortMode),
  }

  $: pollStore.sort(currentSortMode)
  $: anOpenPoll = $pollStore.find((p) => p.open)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({$pollStore.filter((p) => p.open).length})</h1>
  {#if anOpenPoll}
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

{#if anOpenPoll}
  {#each $pollStore as poll (poll.id)}
    <div animate:flip={{ duration: 400 }}>
      {#if poll.open}
        <PollCard
          on:vote={pollHandlers.vote}
          on:close={pollHandlers.close}
          on:delete={pollHandlers.delete}
          {poll}
        />
      {/if}
    </div>
  {/each}
{:else}
  <div in:fade={{ delay: 400 }}><NoPollMessage /></div>
{/if}
