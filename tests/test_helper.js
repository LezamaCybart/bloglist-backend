const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}
