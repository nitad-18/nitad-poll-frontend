<script lang="ts">
  import type { PollDetail } from '$lib/types'
  import { createEventDispatcher } from 'svelte'
  import PollOption from './PollOption.svelte'

  export let poll: PollDetail

  const dispatch = createEventDispatcher<{ delete: { pollId: string } }>()

  const handleDelete = () => {
    dispatch('delete', { pollId: poll.id })
  }

  const handleVote = (event: CustomEvent<{ option: string }>) => {
    console.log(event.detail.option)
  }
</script>

<article
  class="p-4 shadow-md hover:shadow-lg bg-slate-600
			rounded-lg space-y-4"
>
  <header>
    <h2 class="text-xl">{poll.question}</h2>
    <span class="font-extralight opacity-80">Total votes: {poll.votes}</span>
  </header>
  <main>
    <ul class="space-y-4">
      {#each poll.options as pollOption, index}
        <PollOption on:vote={handleVote} {index} {pollOption} totalVotes={poll.votes} />
      {/each}
    </ul>
  </main>
  {#if poll.open}
    <div class="flex justify-center">
      <button
        on:click={handleDelete}
        class="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg 
            font-medium capitalize"
      >
        delete
      </button>
    </div>
  {/if}
</article>
