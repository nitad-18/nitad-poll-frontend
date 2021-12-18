<script lang="ts">
  import PollCard from '$lib/PollCard.svelte'
  import pollStore from '../stores/PollStore'

  const closedPolls = $pollStore.filter((poll) => poll.isClose)
</script>

<svelte:head>
  <title>Closed Polls</title>
</svelte:head>

<h1 class="mb-4">
  Closed Polls ({closedPolls.length})
</h1>

<div class="poll-grid">
  {#each closedPolls as poll (poll.id)}
    <div>
      <PollCard {poll} />
    </div>
  {/each}
</div>
