export type PollDetail = {
  id: string
  question: string
  options: { [option: string]: number }
}
