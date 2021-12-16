<script lang="ts">
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import PollStore from '../../src/stores/PollStore';
</script>

<svelte:head>
  <title>Closed Polls</title>
</svelte:head>

<h1 class="mb-4">Closed Polls page ({$PollStore.filter(p => !p.open).length})</h1>

{#each $PollStore as poll (poll.id)}
  {#if !poll.open}
    <PollCard {poll} />
  {/if}
{/each}
