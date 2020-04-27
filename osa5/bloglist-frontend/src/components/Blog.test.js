import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'test_title',
  author: 'test_author',
  url: 'test_url',
  likes: 22,
  user: {
    name: 'test_name'
  }
}

test('renders title and author', () => {
  const component = render(
    <Blog
      blog={blog}
      handleLike={() => console.log('like')}
      handleRemove={() => console.log('remove')}
      username={'test_username'}
    />
  )

  expect(component.container).toHaveTextContent('test_title')
  expect(component.container).toHaveTextContent('test_author')
  expect(component.container).not.toHaveTextContent('test_url')
  expect(component.container).not.toHaveTextContent(22)
})

test('clicking the button shows url and likes', async () => {
  const component = render(
    <Blog
      blog={blog}
      handleLike={() => console.log('like')}
      handleRemove={() => console.log('remove')}
      username={'test_username'}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test_title')
  expect(component.container).toHaveTextContent('test_author')
  expect(component.container).toHaveTextContent('test_url')
  expect(component.container).toHaveTextContent(22)
})

test('clicking like two times calls event handler twice', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleRemove={() => console.log('remove')}
      username={'test_username'}
    />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})