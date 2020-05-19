import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommendations = (props) => {
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const [books, setBooks] = useState(null)
  const genreResult = useQuery(ME)
  const [genre, setGenre] = useState('')

  useEffect(() => {
    setGenre(genreResult.loading ? '' : genreResult.data.me.favoriteGenre)
  }, [genreResult])

  useEffect(() => {
    getBooks({ variables: { genre } })
  }, [genre, getBooks])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
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
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations