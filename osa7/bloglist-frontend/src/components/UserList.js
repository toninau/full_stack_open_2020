import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
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
              <td>
                <Link to={`users/${user.id}`}>{user.name ? user.name : 'no name'}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList