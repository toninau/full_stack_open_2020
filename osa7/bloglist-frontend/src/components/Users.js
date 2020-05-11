import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('/api/users')
      .then(response => setUsers(response.data))
  }, [])

  const byBlogs = (a, b) => b.blogs.length - a.blogs.length

  return (
    <div>
      <h2>Users</h2>
      <table className="users">
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.sort(byBlogs).map(user =>
            <tr key={user.id}>
              <td>{user.name ? user.name : 'no name'}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users