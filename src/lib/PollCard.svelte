<script lang="ts">
  import type { PollDetail } from '$lib/types'
  import user from '../stores/userStore'
  import { createEventDispatcher } from 'svelte'
  import PollOption from './PollOption.svelte'

  export let poll: PollDetail

  const dispatch = createEventDispatcher<{
    /**
     * Emitted when the poll owner clicks the "Delete" button of a poll specified by `pollId`.
     */
    delete: { pollId: number }
    /**
     * Emitted when the poll owner clicks the "Close" button of a poll specified by `pollId`.
     */
    close: { pollId: number }
    /**
     * Emitted when a user votes on an option specified by `option` of a poll specified by `pollId`.
     */
    vote: { pollId: number; optionId: number; option: string }
  }>()

  const emit = {
    delete: () => dispatch('delete', { pollId: poll.id }),
    close: () => dispatch('close', { pollId: poll.id }),
    vote: (event: CustomEvent<{ optionId: number; option: string }>) =>
      dispatch('vote', {
        pollId: poll.id,
        optionId: event.detail.optionId,
        option: event.detail.option,
      }),
  }

  $: voted = poll.users.some(user => user.id === user.id) // show if user has voted
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
          disabled={voted}
          totalVotes={poll.votes}
        />
      {/each}
    </ul>
  </main>
  {#if !poll.isClose && $user /* in case the user just logged out */ && poll.author.id === $user.id}
    <div class="flex justify-center space-x-4">
      <button on:click={emit.delete} class="btn-primary">delete</button>
      <button on:click={emit.close} class="btn-secondary">Close</button>
    </div>
  {/if}
</article>
