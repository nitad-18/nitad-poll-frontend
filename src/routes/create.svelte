<script lang="ts">
  import PollStore from '../stores/PollStore'
  import type { PollDetail } from '$lib/types'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  let fields: {
    question: string
    options: [string, number][]
  } = {
    question: '',
    options: [['', 0]],
  }
  let questionInput: HTMLInputElement

  const validateForm = () => {
    // check if question is empty
    if (fields.question.trim() === '') {
      return false
    }
    // check if options are empty
    for (const [option] of fields.options) {
      if (option.trim() === '') {
        return false
      }
    }
    return true
  }

  const submitHandler = () => {
    if (!validateForm()) return

    const poll: PollDetail = {
      ...fields,
      id: Math.random() + '',
      open: true,
      votes: 0,
      createdAt: new Date(),
    }
    // save poll to store
    PollStore.add(poll)
    goto('/')
  }

  const addOption = () => {
    fields.options = [['', 0], ...fields.options]
  }

  const autofocus = (e: CustomEvent, index: number) => {
    if (index === 0) {
      ;(e.target as HTMLInputElement).focus()
    }
  }

  onMount(() => {
    questionInput.focus()
  })
</script>

<form
  on:submit|preventDefault={submitHandler}
  class="card p-5 text-center w-[32rem] mx-auto"
>
  <h1>Question:</h1>
  <div class="form-field">
    <input
      bind:this={questionInput}
      bind:value={fields.question}
      placeholder="Your question"
      required
    />
  </div>
  <h1>Options:</h1>
  {#each fields.options as option, index (option)}
    <input
      type="text"
      animate:flip={{ duration: 300 }}
      in:fly={{ duration: 500, y: 10 }}
      on:introstart={(e) => autofocus(e, index)}
      bind:value={option[0]}
      placeholder="Option {fields.options.length - index}"
      required
    />
  {/each}

  <button
    type="button"
    class="text-gray-200 mb-3 underline text-sm"
    on:click={addOption}>Add Option</button
  >
  <br />
  <button type="submit" class="btn-primary" value="Add Poll">Submit</button>
</form>

<style>
  input {
    @apply bg-slate-500 rounded h-10 px-4 w-full;
  }
</style>
