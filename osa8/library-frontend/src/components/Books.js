import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    setBooks(result.loading ? [] : result.data.allBooks)
  }, [result])

  useEffect(() => {
    const genreArrays = books.map(book => book.genres)
    setGenres([...new Set(genreArrays.flat())])
    setFilteredBooks(books)
  }, [books])

  if (!props.show) {
    return null
  }

  const filter = (genre) => {
    if (!genre) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter(book => book.genres.includes(genre)))
    }
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
          {filteredBooks.map(book =>
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
        <button onClick={() => filter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books