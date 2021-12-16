<script lang="ts">
  import PollStore from '../stores/PollStore'
  import type { PollDetail } from '$lib/types'
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  let fields: {
    question: string
    options: [string, number][]
  } = {
    question: '',
    options: [['', 0]],
  }
  let questionInput: HTMLInputElement
  let valid = false

  const submitHandler = () => {
    valid = true

    // add new poll
    if (valid) {
      const poll: PollDetail = { ...fields, id: Math.random() + '', open: true, votes: 0 }

      // save poll to store
      PollStore.update((currentPolls) => {
        console.log(currentPolls)
        return [poll, ...currentPolls]
      })

      goto('/')
    }
  }

  const addOption = () => {
    fields.options[fields.options.length] = ['', 0]
  }

  onMount(() => {
    questionInput.focus()
  })
</script>

<div>
  <form on:submit|preventDefault={submitHandler} class="p-5 shadow-md bg-slate-600 rounded-lg">
    <h1>Question:</h1>
    <div class="form-field">
      <input
        bind:this={questionInput}
        class="bg-slate-500 rounded h-10 px-4"
        bind:value={fields.question}
      />
    </div>
    <h1>Options:</h1>
    {#each fields.options as option}
      <div class="form-field">
        <input type="text" class="bg-slate-500 rounded h-10 px-4" bind:value={option[0]} />
      </div>
    {/each}

    <button type="button" class="text-gray-200 mb-3 underline text-sm" on:click={addOption}
      >Add Option</button
    >
    <br />
    <button type="submit" class="btn-primary" value="Add Poll">Submit</button>
  </form>
</div>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  .form-field {
    margin: 18px auto;
  }
  input {
    width: 100%;
    border-radius: 6px;
    color: white;
  }
</style>
