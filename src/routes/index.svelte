<script lang="ts">
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import { onMount, onDestroy } from 'svelte';
  import type { PollDetail } from '$lib/types'
  import PollStore from '../../src/stores/PollStore';

  const handlePollDelete = (e: CustomEvent<{ pollId: string }>) => {
    console.log(e.detail.pollId)
  }
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<h1 class="mb-4">Current Polls ({$PollStore.length})</h1>

{#each $PollStore as poll (poll.id)}
  <PollCard on:delete={handlePollDelete} {poll} />
{/each}
