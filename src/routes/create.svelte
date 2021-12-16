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
    }
    // save poll to store
    PollStore.update((currentPolls) => {
      console.log(currentPolls)
      return [poll, ...currentPolls]
    })
    goto('/')
  }

  const addOption = () => {
    fields.options[fields.options.length] = ['', 0]
  }

  onMount(() => {
    questionInput.focus()
  })
</script>

<form on:submit|preventDefault={submitHandler} class="card p-5">
  <h1>Question:</h1>
  <div class="form-field">
    <input
      bind:this={questionInput}
      class="bg-slate-500 rounded h-10 px-4"
      bind:value={fields.question}
      required
    />
  </div>
  <h1>Options:</h1>
  {#each fields.options as option}
    <div class="form-field">
      <input
        type="text"
        class="bg-slate-500 rounded h-10 px-4"
        bind:value={option[0]}
        required
      />
    </div>
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
