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
  const response = await instance.post(
    'auth/login',
    { username, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
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
  const response = await instance.get('polls').catch((res) => ({
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
    .catch((res) => ({ data: [] }))
  let allOptions: PollOption[]
  if (pollRes.data) {
    allOptions = []
    for (const [option] of options) {
      const optionRes = await instance.post('options', {
        topic: option,
        pollId: pollRes.data.id,
      })
      allOptions.push(optionRes.data)
    }
  }
  return {
    id: pollRes.data.id,
    author: pollRes.data.author,
    createdDate: pollRes.data.createdDate,
    isClose: pollRes.data.isClose,
    question: pollRes.data.question,
    options: allOptions,
    votes: 0,
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

const axiosInstance = {
  logout,
  login,
  checkMe,
  getPolls,
  deletePoll,
  createPoll,
  closePoll,
  vote,
}

export default axiosInstance
