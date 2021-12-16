<script lang="ts">
  import type { PollDetail } from '$lib/types'
  import { createEventDispatcher } from 'svelte'

  export let poll: PollDetail

  const dispatch = createEventDispatcher()

  const getTotalVotes = (choices: { [choice: string]: number }) =>
    Object.values(choices).reduce((a, b) => a + b, 0)

  const handleDelete = () => {
    dispatch('delete', poll)
  }
</script>

<article
  class="p-4 shadow-md hover:shadow-lg bg-slate-600
			rounded-lg space-y-4"
>
  <header>
    <h2 class="text-xl">{poll.question}</h2>
    <span class="font-extralight opacity-80">Total votes: {getTotalVotes(poll.options)}</span>
  </header>
  <main>
    <ul class="space-y-2">
      {#each Object.entries(poll.options) as choice}
        <li class="p-4 bg-slate-500 rounded relative">
          <span class="inline-block">{choice[0]} ({choice[1]})</span>
          <!-- <div class="absolute h-full bg-blue-300 w-full"></div> -->
        </li>
      {/each}
    </ul>
  </main>
  <button
    on:click={handleDelete}
    class="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg 
				font-medium"
  >
    Delete
  </button>
</article>
