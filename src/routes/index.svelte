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

  // TODO-sort sort the polls whenever the current sort mode changes
  $: openPolls = $pollStore.filter((p) => p.open)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({$pollStore.filter((p) => p.open).length})</h1>

  <!-- TODO-sort 
    - hide the below span and the generated buttons if there's no open polls
  -->
  <span>Sort by:</span>
  <!-- TODO-sort
    - generate <button class="px-2 py-0 transition-colors"> having the inner text from the variable sortModes
    - add a class 'bg-rose-600' if the current sort mode matches this button 
    - click this button to change the current sort mode
    -->
</header>

{#if openPolls.length}
  {#each openPolls as poll (poll.id)}
    <!-- TODO-events handle poll events emitted from <PollCard> -->
    <PollCard {poll} />
  {/each}
{:else}
  <div><NoPollMessage /></div>
{/if}
