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
  {
    id: '2',
    question: 'Comp Sys Arch or HW Syn Lab?',
    options: [
      ['Comp Sys Arch', 25],
      ['HW Syn Lab', 9],
    ],
    votes: 34,
    open: false,
  },
])

export default PollStore
