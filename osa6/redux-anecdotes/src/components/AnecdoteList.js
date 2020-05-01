import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteId } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (!filter) {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const compareByVotes = (a, b) => b.votes - a.votes

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteId(id))
    dispatch(notificationChange(`You voted '${votedAnecdote.content}'`))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.sort(compareByVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

export default AnecdoteList