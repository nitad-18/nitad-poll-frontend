import { writable } from 'svelte/store'
import type { PollDetail } from '$lib/types'

const PollStore = writable<PollDetail[]>([
  {
    id: '1',
    question: 'Python or JavaScript?',
    options: [
      ['Python', 15],
      ['JavaScript', 9],
    ],
    votes: 24,
    open: true,
  },
])

export default PollStore
