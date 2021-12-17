<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard.svelte'
  import type { SortMode } from '$lib/types'
  import pollStore from '../stores/PollStore'

  let currentSortMode: SortMode = 'latest'

  const sortModes: SortMode[] = ['latest', 'popularity']
  const pollHandlers = {
    delete: (e: CustomEvent<{ pollId: number }>) => {
      // TODO-events handle with pollStore
    },
    close: (e: CustomEvent<{ pollId: number }>) => {
      // TODO-events handle with pollStore
    },
    vote: (e: CustomEvent<{ pollId: number; option: string }>) => {
      // TODO-events handle with pollStore
    },
  }

  $: pollStore.sort(currentSortMode)
  $: openPolls = $pollStore.filter((p) => p.open)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({$pollStore.filter((p) => p.open).length})</h1>
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
    <!-- TODO-events handle poll events emitted from <PollCard> -->
    <PollCard {poll} />
  {/each}
{:else}
  <div><NoPollMessage /></div>
{/if}
