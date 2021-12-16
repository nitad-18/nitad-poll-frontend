export type PollOption = [string /* option */, number /* votes on this option*/]

export type PollDetail = {
  id: string
  question: string
  options: PollOption[]
  votes: number
  open: boolean // true means the poll is currently open
}
