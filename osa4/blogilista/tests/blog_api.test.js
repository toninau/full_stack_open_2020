const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET /api/blogs', () => {
  test('right amount of blogs is returned in JSON format', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('identifying field is named id instead of _id', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('HTTP POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    const newBlogReturned = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogsWithoutID = blogsAtEnd.map(blog => {
      const blogWithoutID = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      }
      return blogWithoutID
    })
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsWithoutID).toContainEqual(newBlogReturned)
  })
  test('if likes undefined/empty/null, likes equals 0', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.find(blog => blog.title === newBlog.title).likes
    expect(likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})