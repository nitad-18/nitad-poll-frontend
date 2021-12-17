<script lang="ts">
  import PollCard from '$lib/PollCard.svelte'
  import pollStore from '../stores/PollStore'

  const closedPolls = $pollStore.filter((poll) => !poll.open)
</script>

<svelte:head>
  <title>Closed Polls</title>
</svelte:head>

<h1 class="mb-4">
  Closed Polls ({closedPolls.length})
</h1>

{#each closedPolls as poll (poll.id)}
  <PollCard {poll} />
{/each}
