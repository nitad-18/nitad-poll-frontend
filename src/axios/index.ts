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

const getPolls = async (): Promise<PollDetail[]> => {
  const response = await instance.get('polls').catch(() => ({
    data: [],
  }))
  let polls = []

  try {
    polls = response.data
    pollStore.set(
      polls.map((poll) => {
        let votes = 0
        const options = []

        for (const option of poll.options) {
          options.push(Object.values(option))
          votes += option.votes
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
    )
  } catch (err) {
    return []
  }
}

const createPoll = async (
  question: string,
  options: [string][]
): Promise<PollDetail> => {
  const pollRes = await instance
    .post('polls', { question })
    .catch(() => ({ data: [] }))
  let allOptions: PollOption[]
  if (pollRes.data) {
    allOptions = []
    for (const [option] of options) {
      if (!option) continue
      const optionRes = await instance.post('options', {
        topic: option,
        pollId: pollRes.data.id,
      })
      const { id, topic, votes } = optionRes.data
      allOptions.push([id, topic, votes])
    }
  }
  return {
    id: pollRes.data.id,
    author: pollRes.data.author,
    createdDate: new Date(pollRes.data.createdDate),
    isClose: pollRes.data.isClose,
    question: pollRes.data.question,
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
