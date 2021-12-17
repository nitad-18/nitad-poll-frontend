<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher<{ close: null }>()
</script>

<div
  on:click|self={() => dispatch('close')}
  class="absolute w-full h-full flex justify-center items-center
    text-center z-10 backdrop-blur-sm"
>
  <div class="relative p-16 bg-slate-800 rounded-lg border border-slate-100">
    <img
      on:click={() => dispatch('close')}
      class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-6"
      src="/close.svg"
      alt="close icon"
    />
    <slot>Insert your modal content here</slot>
  </div>
</div>
