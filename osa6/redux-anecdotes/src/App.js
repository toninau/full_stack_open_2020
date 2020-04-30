import React from 'react'
import { voteId } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteId(id))
  }

  const compareByVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compareByVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App