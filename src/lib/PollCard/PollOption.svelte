<script lang="ts">
  import type { PollOption } from '$lib/types'

  export let pollOption: PollOption
  export let totalVotes: number
  export let index: number

  const optionColors = ['bg-blue-300', 'bg-green-300', 'bg-red-300']

  $: [option, votes] = pollOption
  $: width = (votes / totalVotes) * 100 + '%'
  $: bgColor = optionColors[index % 3]
</script>

<li
  class="bg-slate-500 rounded relative h-14 overflow-hidden
        cursor-pointer"
>
  <div style="width: {width};" class="absolute h-full {bgColor}" />
  <span
    class="px-4 flex items-center absolute h-full font-semibold
    text-slate-900">{option} ({votes})</span
  >
</li>
