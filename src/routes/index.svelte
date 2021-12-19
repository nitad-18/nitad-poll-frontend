<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard.svelte'
  import type { PollDetail } from '$lib/types'

  const polls: PollDetail[] = [
    {
      id: 1,
      question: 'Python or JavaScript?',
      options: [
        ['Python', 15],
        ['JavaScript', 9],
      ],
      votes: 24,
      open: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      question: 'Comp Sys Arch or HW Syn Lab?',
      options: [
        ['Comp Sys Arch', 25],
        ['HW Syn Lab', 9],
      ],
      votes: 34,
      open: true,
      createdAt: new Date(Date.now() - 86400000), // yesterday
    },
  ]

  // TODO-store use pollStore instead
  $: openPolls = polls.filter((p) => p.open)
</script>

<svelte:head>
  <title>NITAD Poll</title>
</svelte:head>

<header class="mb-4">
  <h1>Current Polls ({openPolls.length})</h1>
</header>

<!-- TODO-store use pollStore instead -->
{#if openPolls.length}
  {#each openPolls as poll (poll.id)}
    <PollCard {poll} />
  {/each}
{:else}
  <div><NoPollMessage /></div>
{/if}
