import type { PollDetail, PollOption, User } from '$lib/types'
import pollStore from '../stores/PollStore'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  withCredentials: true,
})

const logout = async (): Promise<boolean> => {
  const response = await instance.delete('/auth/logout')
  return response.status === 204
}

const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  const response = await instance.post('auth/login', { username, password })
  const data = await response.data
  return response.status === 200 ? data : null
}

const checkMe = async (): Promise<User | null> => {
  const response = await instance.get('auth/me')
  if (response.status === 200) {
    return (await response.data) as User
  }
  return null
}

const getPolls = async (): Promise<void> => {
  // the type of data that the server returns
  type GetPollsResponseData = {
    id: number
    question: string
    isClose: boolean
    closedDate: string | null
    createdDate: string
    author: User
    options: {
      id: number
      topic: string
      votes: number
    }[]
    users: User[]
  }[]

  const response = await instance.get<GetPollsResponseData>('polls').catch<{
    data: GetPollsResponseData
  }>(() => ({ data: [] }))
  const { data: polls } = response

  // if something went wrong with the request, data is set to [] with the catch
  if (!polls) return

  // polls from the server are stored differently than the polls in the store
  const transformedPolls = polls.map((poll) => {
    let votes = 0
    const options: PollOption[] = []

    for (const { id, topic, votes: voteOnThisOption } of poll.options) {
      options.push([id, topic, voteOnThisOption])
      votes += voteOnThisOption
    }

    return {
      id: poll.id,
      question: poll.question,
      options,
      votes,
      isClose: poll.isClose,
      author: poll.author,
      createdDate: new Date(poll.createdDate),
      closedDate: poll.closedDate ? new Date(poll.closedDate) : null,
      users: poll.users,
    }
  })
  pollStore.set(transformedPolls)
}

/**
 * There are 2 steps to creating a poll:
 * 1. request to create a poll
 * 2. for each option, request to insert the option to the poll
 * @param question the question of the poll
 * @param options options of the poll
 * @returns PollDetail if the poll was created successfully, null otherwise
 */
const createPoll = async (
  question: string,
  options: [string][]
): Promise<PollDetail | null> => {
  type PostPollsResponseData = {
    author: User
    closedDate: string | null
    createdDate: string
    id: number
    isClose: boolean
    question: string
    updatedDate: string
  }
  type PostOptionsResponseData = {
    id: number
    topic: string
    votes: number
    createdDate: string
    updatedDate: string
  }

  // step 1: create the poll
  const postPollsRes = await instance
    .post<PostPollsResponseData>('polls', { question })
    .catch<{ data: null }>(() => ({ data: null }))

  if (!postPollsRes.data) return null

  const {
    data: { id: pollId, author, createdDate, isClose },
  } = postPollsRes

  const allOptions: PollOption[] = []
  // step 2: insert the options to the poll
  for (const [option] of options) {
    if (!option) continue
    const optionRes = await instance.post<PostOptionsResponseData>('options', {
      topic: option,
      pollId,
    })
    const { id: optionId, topic, votes } = optionRes.data
    allOptions.push([optionId, topic, votes])
  }

  return {
    id: pollId,
    author,
    createdDate: new Date(createdDate),
    isClose,
    question,
    options: allOptions,
    votes: 0,
    users: [],
  }
}

const vote = async (pollId: number, optionId: number): Promise<boolean> => {
  const response = await instance.patch(
    'polls/vote/' + pollId + '/options/' + optionId
  )
  return response.status === 200
}

const closePoll = async (pollId: number): Promise<boolean> => {
  const response = await instance.patch('polls/close/' + pollId)
  return response.status === 200
}

const deletePoll = async (pollId: number): Promise<boolean> => {
  const response = await instance.delete('polls/' + pollId)
  return response.status === 204
}

const register = async (
  username: string,
  password: string
): Promise<boolean> => {
  const response = await instance.post('auth/register', {
    username,
    password,
    displayName: 'displayName', // we don't care about displayName
  })
  return response.status === 201
}

const axiosInstance = {
  logout,
  login,
  checkMe,
  getPolls,
  deletePoll,
  createPoll,
  closePoll,
  vote,
  register,
}

export default axiosInstance
