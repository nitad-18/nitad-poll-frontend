<script lang="ts">
  import type { PollDetail } from '$lib/types'

  const polls: PollDetail[] = [
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
      users: [{
        id: 1,
        username: 'john',
        displayName: 'John Doe',
      }],
      closedDate: null,
      createdDate: new Date(Date.now() - 86400000), // yesterday
    },
  ]
</script>

<h1>Hello World!</h1>
