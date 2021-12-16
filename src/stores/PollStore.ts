import { writable } from 'svelte/store'
import type { SortMode, PollDetail } from '$lib/types'

// const PollStore = writable<PollDetail[]>([
//   {
//     id: '1',
//     question: 'Python or JavaScript?',
//     options: [
//       ['Python', 15],
//       ['JavaScript', 9],
//     ],
//     votes: 24,
//     open: true,
//     createdAt: new Date(),
//   },
//   {
//     id: '2',
//     question: 'Comp Sys Arch or HW Syn Lab?',
//     options: [
//       ['Comp Sys Arch', 25],
//       ['HW Syn Lab', 9],
//     ],
//     votes: 34,
//     open: false,
//     createdAt: new Date(),
//   },
// ])

// export default PollStore

/**
 * a custom store is just a function that returns at least a subscribe function
 */
const createPollStore = () => {
  const { subscribe, update } = writable<PollDetail[]>([
    {
      id: '1',
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
      id: '2',
      question: 'Comp Sys Arch or HW Syn Lab?',
      options: [
        ['Comp Sys Arch', 25],
        ['HW Syn Lab', 9],
      ],
      votes: 34,
      open: true,
      createdAt: new Date(),
    },
  ])

  const sort = (by: SortMode) => {
    if (by === 'popularity') {
      update((polls) => {
        return polls.sort((a, b) => b.votes - a.votes)
      })
    }
    update((polls) => {
      return polls.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    })
  }

  return {
    subscribe,
    sort,
  }
}

const PollStore = createPollStore()
export default PollStore
