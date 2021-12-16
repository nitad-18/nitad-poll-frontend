<script lang="ts">
  import type { PollDetail } from '$lib/types'
  import { createEventDispatcher } from 'svelte'
  import PollOption from './PollOption.svelte'

  export let poll: PollDetail

  const dispatch = createEventDispatcher<{
    /**
     * Emitted when the poll owner clicks the "Delete" button of a poll specified by `pollId`.
     */
    delete: { pollId: string }
    /**
     * Emitted when the poll owner clicks the "Close" button of a poll specified by `pollId`.
     */
    close: { pollId: string }
    /**
     * Emitted when a user votes on an option specified by `option` of a poll specified by `pollId`.
     */
    vote: { pollId: string; option: string }
  }>()

  const emit = {
    delete: () => dispatch('delete', { pollId: poll.id }),
    close: () => dispatch('close', { pollId: poll.id }),
    vote: (event: CustomEvent<{ option: string }>) =>
      dispatch('vote', { pollId: poll.id, option: event.detail.option }),
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
        <PollOption
          on:vote={emit.vote}
          {index}
          {pollOption}
          totalVotes={poll.votes}
        />
      {/each}
    </ul>
  </main>
  {#if poll.open}
    <div class="flex justify-center space-x-4">
      <button on:click={emit.delete} class="btn-primary">delete</button>
      <button on:click={emit.close} class="btn-secondary">Close</button>
    </div>
  {/if}
</article>
