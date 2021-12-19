<script lang="ts">
  import pollStore from '../stores/PollStore'
  import type { PollDetail } from '$lib/types'
  import { goto } from '$app/navigation'

  type optionText = string // only here for descriptive purposes

  // the text binded to value of the question input
  let question = ''
  let options: [optionText][] = [['']] // just use this data structure

  // the qustion <input />
  let questionInput: HTMLInputElement

  /**
   * validate the form before submitting
   */
  const validateForm = () => {
    // TODO-create-poll
    // check if question is empty
    // check if at least one option is entered
    return false
  }

  /**
   * remove duplicate options (make changes to the variable `options`)
   */
  const removeDuplicate = () => {
    // TODO-create-poll
  }

  /**
   * create a new deault poll
   */
  const createPoll = (): PollDetail => {
    // TODO-create-poll
    return /* ??? */
  }

  const handleSubmit = () => {
    // validate the form
    if (!validateForm()) return
    // remove duplicate options
    removeDuplicate()
    // create a new poll from the validated form data
    const poll = createPoll()
    // save the poll to poll store
    pollStore.add(poll)
    // navigate to the current polls page
    goto('/') // sveltekit specific
  }

  /**
   * add a new empty option to the form (to the varbiable `options`)
   */
  const addOption = () => {
    // TODO-create-poll
  }

  // TODO-create-poll focus the question input on mount
</script>

<form class="card !p-5 text-center w-[32rem] mx-auto">
  <h1>Question:</h1>
  <input placeholder="Your question" required />

  <h1>Options:</h1>
  <!-- TODO-create-poll
  - generate all option <input> based on the variable `options`
  - each <input> value must be binded to the corresponding values in `options`
  - each <input> displays a placholder "Option {a number}", for example, for the <input> that is second in order should display "Option 2" as its placeholder. hint hint index?
  -->
  <input
    type="text"
    placeholder="Option 'hardcoded 1'"
    on:keypress={(e) => {
      // TODO-create-poll press 'Enter' on any option <input> to add a new option <input> *at the top* (at the 0th index of `options`)
    }}
  />

  <!-- TODO-create-poll click this button to add a new option -->
  <button type="button" class="text-gray-200 mb-3 underline text-sm"
    >Add Option</button
  >
  <br />

  <!-- TODO-create-poll click this button to submit the poll -->
  <button type="button" class="btn-primary">Submit</button>
</form>

<style>
  input {
    @apply bg-slate-500 rounded h-10 px-4 w-full;
  }
</style>
