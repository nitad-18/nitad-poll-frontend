export type PollOption = [
  number /* id */,
  string /* option */,
  number /* votes on this option*/
]

export type PollDetail = {
  id: number
  question: string
  options: PollOption[]
  votes: number // total votes on this poll
  isClose: boolean // true means the poll is currently open
  author: User // author of poll
  createdDate: Date
  closedDate?: Date
  users: User[] // users who voted on this poll
}

export type SortMode = 'latest' | 'popularity'

export type PagePathDetail = {
  path: string
  name: string
}

export type LoginRegisterMode = 'login' | 'register'

export type User = {
  id: number
  username: string
  displayName: string
}
