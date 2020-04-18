const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
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
    await api
      .post('/api/users')
      .send(helper.user)
    const login = await api
      .post('/api/login')
      .send(helper.user)
    const token = login.body.token

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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
    expect(blogsWithoutID).toContainEqual(newBlog)
  })
  test('if likes undefined/empty/null, likes equals 0', async () => {
    await api
      .post('/api/users')
      .send(helper.user)
    const login = await api
      .post('/api/login')
      .send(helper.user)
    const token = login.body.token

    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.find(blog => blog.title === newBlog.title).likes
    expect(likes).toBe(0)
  })
  test('missing title and/or url returns status code 400', async () => {
    await api
      .post('/api/users')
      .send(helper.user)
    const login = await api
      .post('/api/login')
      .send(helper.user)
    const token = login.body.token

    const newBlog = {
      author: 'Robert C. Martin'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
  test('requires token or returns status code 401', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('HTTP DELETE /api/blogs/:id', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    await api
      .post('/api/users')
      .send(helper.user)
    const login = await api
      .post('/api/login')
      .send(helper.user)
    const token = login.body.token

    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

    const blogToDelete = blogsAfterAddition.find(blog => blog.title === newBlog.title)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAfterAddition.length - 1)

    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).not.toContain(blogToDelete.id)
  })
  test('requires token or returns status code 401', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.length)
  })
})

describe('HTTP PUT /api/blogs/:id', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      likes: 0
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
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
    expect(blogsWithoutID).toContainEqual(updatedBlog)
  })
})

afterAll(() => {
  mongoose.connection.close()
})