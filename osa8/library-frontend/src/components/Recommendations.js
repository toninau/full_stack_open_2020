import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const result2 = useQuery(ME)
  const [books, setBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState('')

  useEffect(() => {
    setBooks(result.loading ? [] : result.data.allBooks
      .filter(book => book.genres.includes(favoriteGenre)))
  }, [result, favoriteGenre])

  useEffect(() => {
    setFavoriteGenre(result2.loading ? '' : result2.data.me.favoriteGenre)
  }, [result2])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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