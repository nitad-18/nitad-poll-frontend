<script lang="ts">
  import type { PollDetail } from '$lib/types'
  import PollOption from './PollOption.svelte'

  export let poll: PollDetail

  // emit enough detail so that the poll store can do its work
  const emit = {
    delete: () => {
      // TODO-events dispatch delete event
    },
    close: () => {
      // TODO-events dispatch close event
    },
    vote: (event: CustomEvent<{ option: string }>) => {
      // TODO-events dispatch vote event
    },
  }
</script>

<article class="card">
  <header>
    <h2 class="text-xl">{poll.question}</h2>
    <span class="font-extralight opacity-80">Total votes: {poll.votes}</span>
  </header>
  <main>
    <ul class="space-y-4">
      {#each poll.options as pollOption, index}
        <!-- TODO-events pass the event from <PollOption> to the parent -->
        <PollOption {index} {pollOption} totalVotes={poll.votes} />
      {/each}
    </ul>
  </main>
  {#if poll.open}
    <div class="flex justify-center space-x-4">
      <!-- TODO-events emit appropriate events when clicking these -->
      <button class="btn-primary">delete</button>
      <button class="btn-secondary">Close</button>
    </div>
  {/if}
</article>
