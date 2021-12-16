<script lang="ts">
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import type { SortMode } from '$lib/types'
  import PollStore from '../../src/stores/PollStore'

  const handlePollDelete = (e: CustomEvent<{ pollId: string }>) => {
    console.log(e.detail.pollId)
  }

  let sortMode: SortMode = 'latest'
  const sortModes: SortMode[] = ['latest', 'popularity']

  $: PollStore.sort(sortMode)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({$PollStore.filter((p) => p.open).length})</h1>
  <span>Sort by:</span>
  {#each sortModes as mode}
    <button
      on:click={() => (sortMode = mode)}
      class="px-2 py-0 transition-colors"
      class:bg-red-400={mode === sortMode}>{mode}</button
    >
  {/each}
</header>

{#each $PollStore as poll (poll.id)}
  {#if poll.open}
    <PollCard on:delete={handlePollDelete} {poll} />
  {/if}
{/each}
