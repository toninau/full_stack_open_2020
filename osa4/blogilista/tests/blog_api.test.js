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
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }

    const newBlogReturned = {
      id: newBlog._id,
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

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd).toContainEqual(newBlogReturned)
  })
})

afterAll(() => {
  mongoose.connection.close()
})