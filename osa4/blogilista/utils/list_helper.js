const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, 0)
  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}