import { writable } from 'svelte/store'
import type { SortMode, PollDetail } from '$lib/types'

/**
 * a custom store is just a function that returns at least a `subscribe` function
 */
const createPollStore = () => {
  const { subscribe } = writable<PollDetail[]>([
    {
      id: 1,
      question: 'Python or JavaScript?',
      options: [
        [1, 'Python', 15],
        [2, 'JavaScript', 9],
      ],
      votes: 24,
      isClose: false,
      author: {
        id: 1,
        username: 'john',
        displayName: 'John Doe',
      },
      users: [],
      closedDate: null,
      createdDate: new Date(),
    },
    {
      id: 2,
      question: 'Comp Sys Arch or HW Syn Lab?',
      options: [
        [1, 'Comp Sys Arch', 25],
        [2, 'HW Syn Lab', 9],
      ],
      votes: 34,
      isClose: false,
      author: {
        id: 2,
        username: 'jane',
        displayName: 'Jane Dee',
      },
      users: [
        {
          id: 1,
          username: 'john',
          displayName: 'John Doe',
        },
      ],
      closedDate: null,
      createdDate: new Date(Date.now() - 86400000), // yesterday
    },
  ])

  /**
   * sort the polls in the store by the given mode
   * @param by mode to sort by, 'popularity' or 'latest'
   */
  const sort = (by: SortMode) => {
    // TODO-sort
  }

  return {
    subscribe,
    sort,
  }
}

const pollStore = createPollStore()
export default pollStore
