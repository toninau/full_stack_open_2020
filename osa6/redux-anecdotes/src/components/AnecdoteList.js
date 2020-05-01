import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteId } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const compareByVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.sort(compareByVotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteId(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList