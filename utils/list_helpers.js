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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
