<script lang="ts">
  import PollCard from '$lib/PollCard/PollCard.svelte'
  import type { PollDetail } from '$lib/types'

  const polls: PollDetail[] = [
    {
      id: '1',
      question: 'Python or JavaScript?',
      options: [
        ['Python', 15],
        ['JavaScript', 9],
      ],
      votes: 24,
    },
  ]
</script>

<h1 class="mb-4">Current Polls ({polls.length})</h1>

{#each polls as poll (poll.id)}<PollCard {poll} />{/each}
