<script lang="ts">
  import NoPollMessage from '$lib/NoPollMessage.svelte'
  import PollCard from '$lib/PollCard.svelte'
  import type { PollDetail } from '$lib/types'

  const polls: PollDetail[] = [
    {
      id: 1,
      question: 'Python or JavaScript?',
      options: [
        [1, 'Python', 15],
        [2, 'JavaScript', 9],
      ],
      votes: 24,
      isClose: false,
      author: {
        id: 1,
        username: 'john',
        displayName: 'John Doe',
      },
      users: [],
      closedDate: null,
      createdDate: new Date(),
    },
    {
      id: 2,
      question: 'Comp Sys Arch or HW Syn Lab?',
      options: [
        [1, 'Comp Sys Arch', 25],
        [2, 'HW Syn Lab', 9],
      ],
      votes: 34,
      isClose: false,
      author: {
        id: 2,
        username: 'jane',
        displayName: 'Jane Dee',
      },
      users: [{
        id: 1,
        username: 'john',
        displayName: 'John Doe',
      }],
      closedDate: null,
      createdDate: new Date(Date.now() - 86400000), // yesterday
    },
  ]

  // TODO-store use pollStore instead
  $: openPolls = polls.filter((p) => !p.isClose)
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
