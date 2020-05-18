import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BornForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn, result] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    if (name && born) {
      changeBorn({ variables: { name, setBornTo: parseInt(born) } })
      setName('')
      setBorn('')
    }
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(author =>
            <option key={author.name} value={author.name}>{author.name}</option>
          )}
        </select>
        <div>
          born<input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BornForm authors={result.data.allAuthors} />
    </div>
  )
}

export default Authors
