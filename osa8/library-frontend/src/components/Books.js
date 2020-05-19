import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState([])

  const filter = (genre) => {
    getBooks({ variables: { genre } })
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    const genreArrays = props.books.map(book => book.genres)
    setGenres([...new Set(genreArrays.flat())])
  }, [props.books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            ? books.map(book =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
            :
            props.books.map(book =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <div>
        {genres.map(genre =>
          <button key={genre} onClick={() => filter(genre)}>{genre}</button>
        )}
        <button onClick={() => setBooks(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books