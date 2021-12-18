<script lang="ts">
  import type { PollOption, PollOptionDto } from '$lib/types'
  import { createEventDispatcher } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let pollOption: PollOption
  export let totalVotes: number
  export let index: number

  const dispatch =
    createEventDispatcher<{ vote: { optionId: number; option: string } }>()
  const optionColors = ['bg-blue-300', 'bg-green-300', 'bg-red-300']

  $: [optionId, option, votes] = pollOption
  $: bgColor = optionColors[index % optionColors.length]

  // $: bgWidth = (totalVotes ? (votes / totalVotes) * 100 : 1)
  const bgWidth = tweened(undefined, { duration: 500, easing: cubicOut })
  $: $bgWidth = totalVotes ? (votes / totalVotes) * 100 : 1

  const emit = {
    vote: () => dispatch('vote', { optionId, option }),
  }
</script>

<li
  on:click={emit.vote}
  class="bg-slate-500 rounded relative h-14 overflow-hidden
        cursor-pointer"
>
  <!-- <div style="width: {bgWidth}%;" class="absolute h-full {bgColor}" /> -->
  <div style="width: {$bgWidth}%;" class="absolute h-full {bgColor}" />
  <span
    class="px-4 flex items-center absolute h-full font-semibold
    text-slate-900">{option} ({votes})</span
  >
</li>
