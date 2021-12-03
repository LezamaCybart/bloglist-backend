const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  //jest.useFakeTimers('legacy')
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash})

  await user.save()

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)

test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blogs is named "id"', async() => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()
})

test('a valid blog can be added', async() => {
  const newBlog = {
    title: 'AFFC',
    author: 'GRRM',
    url: 'affc.com',
    likes: 2
  }

  let token = '';
  const blogCreator = {
    username: 'root',
    password: 'sekret'
  }

  await api
    .post('/api/login')
    .send(blogCreator)
    .expect(200)
    .then(res => {
      token = res.body.token
      console.log(token)
    })

  console.log(token)
  await api
    .post('/api/blogs')
    .set('Authorization',  'bearer ' + token)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'AFFC'
  )
})

test('like property missing in request defaults to 0', async() => {
  const newBlog = {
    title: 'AFFC',
    author: 'GRRM',
    url: 'affc.com',
  }
  let token = '';
  const blogCreator = {
    username: 'root',
    password: 'sekret'
  }

  await api
    .post('/api/login')
    .send(blogCreator)
    .expect(200)
    .then(res => {
      token = res.body.token
      console.log(token)
    })

  const postedBlog = await api
    .post('/api/blogs')
    .set('Authorization',  'bearer ' + token)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(postedBlog.body.likes).toEqual(0)
})

test('updating like count of post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    likes: 4
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(updatedBlog.body.likes).toEqual(newBlog.likes)
})
test('blog with no url is not added', async () => {
  const newBlog = {
    title: 'AFFC',
    author: 'GRRM',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('succeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    let token = '';
    const blogCreator = {
      username: 'root',
      password: 'sekret'
    }

    await api
      .post('/api/login')
      .send(blogCreator)
      .expect(200)
      .then(res => {
        token = res.body.token
        console.log(token)
      })

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization',  'bearer ' + token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
