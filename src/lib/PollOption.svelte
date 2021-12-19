<script lang="ts">
  import type { PollOption } from '$lib/types'

  export let pollOption: PollOption
  export let totalVotes: number
  export let index: number

  const optionColors = ['bg-blue-300', 'bg-green-300', 'bg-red-300']

  $: [, option, votes] = pollOption
  $: bgColor = optionColors[index % optionColors.length]

  $: bgWidth = totalVotes ? (votes / totalVotes) * 100 : 1

  const emit = {
    vote: () => {
      // TODO-events emit vote event with neccessary data
    },
  }
</script>

<!-- TODO-evets emit event using `emit.vote` -->
<li
  class="bg-slate-500 rounded relative h-14 overflow-hidden
        cursor-pointer"
>
  <div style="width: {bgWidth}%;" class="absolute h-full {bgColor}" />
  <span
    class="px-4 flex items-center absolute h-full font-semibold
    text-slate-900">{option} ({votes})</span
  >
</li>
