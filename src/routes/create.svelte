<script>
  import PollStore from '../stores/PollStore'
  import { createEventDispatcher } from 'svelte'


  let dispatch = createEventDispatcher()
  let fields = {
    question: '',
    options: [
      ['Python', 0],
      ['JavaScript', 0],
    ],
  }

  let valid = false

  const submitHandler = () => {
    valid = true

    // add new poll
    if (valid) {
      let poll = { ...fields, id: Math.random() + '', open: true, votes: 0 }

      // save poll to store
      PollStore.update((currentPolls) => {
        console.log(currentPolls)
        return [poll, ...currentPolls]
      })
      dispatch('add')
    }
  }

  const addOption = () => {
    fields.options[fields.options.length] = ['', 0]
  }
</script>

<div class="p-3 shadow-md bg-slate-600">
  <form on:submit|preventDefault={submitHandler}>
    <h1>Question:</h1>
    <div class="form-field">
      <input
        type="text"
        id="question"
        class="bg-slate-500 rounded h-10 px-4"
        bind:value={fields.question}
      />

    </div>
    <h1>Options:</h1>
    {#each fields.options as option}
      <div class="form-field">

        <input
          type="text"
          id="answer-"
          class="bg-slate-500 rounded h-10 px-4"
          bind:value={option[0]}
        />

      </div>
    {/each}

    <button type="button" class="text-gray-200 mb-3 underline" on:click={addOption}
      >Add Option</button
    >
    <br />
    <button
      type="submit"
      class="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg 
    font-medium capitalize"
      value="Add Poll">Submit</button
    >
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
  label {
    margin: 10px auto;
    text-align: left;
  }

</style>
