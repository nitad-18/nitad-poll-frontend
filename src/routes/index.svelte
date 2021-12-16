<script lang="ts">
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import type { SortMode } from '$lib/types'
  import PollStore from '../../src/stores/PollStore'

  let sortMode: SortMode = 'latest'

  const sortModes: SortMode[] = ['latest', 'popularity']
  const pollHandlers = {
    delete: (e: CustomEvent<{ pollId: string }>) =>
      PollStore.remove(e.detail.pollId),
    close: (e: CustomEvent<{ pollId: string }>) =>
      PollStore.close(e.detail.pollId),
    vote: (e: CustomEvent<{ pollId: string; option: string }>) =>
      PollStore.vote(e.detail.pollId, e.detail.option, sortMode),
  }

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
      class:bg-rose-600={mode === sortMode}>{mode}</button
    >
  {/each}
</header>

{#each $PollStore as poll (poll.id)}
  {#if poll.open}
    <PollCard
      on:vote={pollHandlers.vote}
      on:close={pollHandlers.close}
      on:delete={pollHandlers.delete}
      {poll}
    />
  {/if}
{/each}
