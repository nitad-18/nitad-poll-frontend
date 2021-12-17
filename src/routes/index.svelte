<script lang="ts">
  import type { PollDetail } from '$lib/types'

  const polls: PollDetail[] = [
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
  ]
</script>

<h1>Hello World!</h1>
