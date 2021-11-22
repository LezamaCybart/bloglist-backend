const favoriteBlog = require('./../utils/list_helpers').favoriteBlog

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a432aa71b54a676234d17f8',
      title: 'another title',
      author: 'author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a428aa71b54a676234d17f8',
      title: 'favorite blog',
      author: 'Author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    }
  ]
  test('finds blog with more likes in array of multiple blogs', () => {
    const result = favoriteBlog(listWithMultipleBlogs)
    const mostLikedBlog = listWithMultipleBlogs.find(blog => blog.title === 'favorite blog')

    expect(result).toEqual(mostLikedBlog)
  })
})
