import { writable } from 'svelte/store'
import type { SortMode, PollDetail } from '$lib/types'

/**
 * a custom store is just a function that returns at least a `subscribe` function
 */
const createPollStore = () => {
  const { subscribe, update } = writable<PollDetail[]>([
    {
      id: 1,
      question: 'Python or JavaScript?',
      options: [
        ['Python', 15],
        ['JavaScript', 9],
      ],
      votes: 24,
      open: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      question: 'Comp Sys Arch or HW Syn Lab?',
      options: [
        ['Comp Sys Arch', 25],
        ['HW Syn Lab', 9],
      ],
      votes: 34,
      open: true,
      createdAt: new Date(Date.now() - 86400000), // yesterday
    },
  ])

  /**
   * sort the polls in the store by the given mode
   * @param by mode to sort by, 'popular' or 'latest'
   */
  const sort = (by: SortMode) => {
    if (by === 'popularity') {
      update((polls) => polls.sort((a, b) => b.votes - a.votes))
      return
    }
    update((polls) => {
      return polls.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    })
  }

  /**
   * remove a poll given its id from the store
   * @param pollId The id of the poll to be removed
   */
  const remove = (pollId: number) => {
    // TODO-events
  }

  /**
   * close a poll given its id in the store
   * @param pollId The id of the poll to be closed
   */
  const close = (pollId: number) => {
    // TODO-events
  }

  /**
   * update the number of votes on the option of a poll
   * @param pollId The id of the poll that the user voted on
   * @param option The option that the user voted on
   * @param sortMode The current sort mode that is being used
   */
  const vote = (pollId: number, option: string, sortMode: SortMode) => {
    // TODO-events
    // update the number of votes on the option of a poll
    // if the sort mode is 'popularity' then sort the polls in case there is a change in order
  }

  return {
    subscribe,
    sort,
    remove,
    close,
    vote,
  }
}

const pollStore = createPollStore()
export default pollStore
