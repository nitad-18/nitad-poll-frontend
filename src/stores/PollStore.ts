import { get, writable } from 'svelte/store'
import type { SortMode, PollDetail, PollOption } from '$lib/types'
import user from './userStore'

/**
 * a custom store is just a function that returns at least a `subscribe` function
 */
const createPollStore = () => {
  const { subscribe, update, set } = writable<PollDetail[]>([])

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
      return polls.sort((a, b) => {
        return b.createdDate.getTime() - a.createdDate.getTime()
      })
    })
  }

  /**
   * add a new poll to the store
   * @param poll The new poll to be added to the store
   */
  const add = (poll: PollDetail) => {
    update((currentPolls) => [poll, ...currentPolls])
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
      currentPolls.find((poll) => poll.id === pollId).isClose = true
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
      poll.options.find((opt) => opt[1] === option)[2]++
      poll.votes++
      poll.users.push(get(user))
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
    set,
  }
}

const pollStore = createPollStore()
export default pollStore
