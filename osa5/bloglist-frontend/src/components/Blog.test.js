import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url',
    likes: 22
  }

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