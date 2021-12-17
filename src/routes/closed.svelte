<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import pollStore from '../../src/stores/PollStore'
</script>

<svelte:head>
  <title>Closed Polls</title>
</svelte:head>

<h1 class="mb-4">
  Closed Polls page ({$pollStore.filter((p) => !p.open).length})
</h1>

{#if $pollStore.length}
  {#each $pollStore as poll (poll.id)}
    {#if !poll.open}
      <PollCard {poll} />
    {/if}
  {/each}
{:else}
  <NoPollMessage />
{/if}
