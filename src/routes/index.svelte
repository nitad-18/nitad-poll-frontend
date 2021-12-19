<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard.svelte'
  import pollStore from '../stores/PollStore'

  // TODO-sort sort the polls whenever the current sort mode changes
  $: openPolls = $pollStore.filter((p) => !p.isClose)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({openPolls.length})</h1>

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
    <PollCard {poll} />
  {/each}
{:else}
  <div><NoPollMessage /></div>
{/if}
