export type PollOption = [string, number]

export type PollDetail = {
  id: string
  question: string
  options: PollOption[]
  votes: number
}
