import { writable } from 'svelte/store'
import type { SortMode, PollDetail } from '$lib/types'

/**
 * a custom store is just a function that returns at least a `subscribe` function
 */
const createPollStore = () => {
  const { subscribe, update } = writable<PollDetail[]>([])

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
   * add a new poll to the store
   * @param poll The new poll to be added to the store
   */
  const add = (poll: PollDetail) => {
    // TODO-create-poll
  }

  /**
   * remove a poll given its id from the store
   * @param pollId The id of the poll to be removed
   */
  const remove = (pollId: number) => {
    update((currentPolls) => currentPolls.filter((poll) => poll.id !== pollId))
  }

  /**
   * close a poll given its id in the store
   * @param pollId The id of the poll to be closed
   */
  const close = (pollId: number) => {
    update((currentPolls) => {
      currentPolls.find((poll) => poll.id === pollId).open = false
      return currentPolls
    })
  }

  /**
   * update the number of votes on the option of a poll
   * @param pollId The id of the poll that the user voted on
   * @param option The option that the user voted on
   * @param sortMode The current sort mode that is being used
   */
  const vote = (pollId: number, option: string, sortMode: SortMode) => {
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

const pollStore = createPollStore()
export default pollStore
