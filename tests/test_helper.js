const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'AGOT',
    author: 'GRRM',
    url: 'someurl.com'
  },
  {
    title: 'ASOS',
    author: 'GRRM',
    url: 'someurlasos.com'
  },
  {
    title: 'TTBP',
    author: 'Cixin Liu',
    url: 'TTBP.com'
  },
  {
    title: 'tdt',
    author: 'KING',
    url: 'dark.com'
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.fins({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}
