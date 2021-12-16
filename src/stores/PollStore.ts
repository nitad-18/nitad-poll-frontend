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
  const { subscribe, update } = writable<PollDetail[]>([])

  const sort = (by: SortMode) => {
    if (by === 'popularity') {
      update((polls) => polls.sort((a, b) => b.votes - a.votes))
      return
    }
    update((polls) => {
      return polls.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    })
  }

  const add = (poll: PollDetail) => {
    update((currentPolls) => [poll, ...currentPolls])
  }

  const remove = (pollId: string) => {
    update((currentPolls) => currentPolls.filter((poll) => poll.id !== pollId))
  }

  const close = (pollId: string) => {
    update((currentPolls) => {
      currentPolls.find((poll) => poll.id === pollId).open = false
      return currentPolls
    })
  }

  const vote = (pollId: string, option: string, sortMode: SortMode) => {
    update((currentPolls) => {
      const poll = currentPolls.find((poll) => poll.id === pollId)
      poll.options.find((opt) => opt[0] === option)[1]++
      poll.votes++
      return currentPolls
    })
    if (sortMode === 'popularity') {
      sort(sortMode)
    }
  }

  return {
    subscribe,
    sort,
    add,
    remove,
    close,
    vote,
  }
}

const PollStore = createPollStore()
export default PollStore
