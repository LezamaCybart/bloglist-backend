const _ = require('lodash')
const dummy = (blogs) => {
  blogs //linter
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)

  return likes
} 

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((a, b) => (a.likes > b.likes) ? a : b)

  return favorite
}

const getMostProlificAuthor = (blogs) => {
  const bookCount = _.countBy(blogs, 'author')
  const buildAuthor = (authorObject) => {
    return {
      'author': authorObject['author'],
      'books': bookCount[authorObject['author']]
    }
  }
  const completeList = _.map(blogs, buildAuthor)
  const sortedCount = _.orderBy(completeList, 'books', 'desc')

  return sortedCount[0]
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  getMostProlificAuthor
}
