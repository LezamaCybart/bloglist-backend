const dummy = (blogs) => {
  blogs //linter
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)

  return likes
} 

module.exports = {
  dummy,
  totalLikes
}
