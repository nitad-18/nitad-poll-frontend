<script lang="ts">
  import type { PollDetail } from '$lib/types'
  import PollOption from './PollOption.svelte'

  export let poll: PollDetail
</script>

<article class="card">
  <header>
    <h2 class="text-xl">{poll.question}</h2>
    <span class="font-extralight opacity-80">Total votes: {poll.votes}</span>
  </header>
  <main>
    <ul class="space-y-4">
      {#each poll.options as pollOption, index}
        <PollOption {index} {pollOption} totalVotes={poll.votes} />
      {/each}
    </ul>
  </main>
  {#if !poll.isClose}
    <div class="flex justify-center space-x-4">
      <button class="btn-primary">delete</button>
      <button class="btn-secondary">Close</button>
    </div>
  {/if}
</article>
