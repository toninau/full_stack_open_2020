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

const mostBlogs = (blogs) => {
  const authorNames = [...new Set(blogs.map(blog => blog.author))]
  const blogArray = authorNames.map(name => {
    const blogObject = {
      author: name,
      blogs: blogs.filter(blog => blog.author === name).length
    }
    return blogObject
  })
  const mostCommon = blogArray.reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current, 0)
  return mostCommon
}

const mostLikes = (blogs) => {
  const authorNames = [...new Set(blogs.map(blog => blog.author))]
  const blogArray = authorNames.map(name => {
    const authorsBlogs = blogs.filter(blog => blog.author === name)
    const authorsLikes = authorsBlogs.reduce((prev, current) => (prev + current.likes), 0)
    const blogObject = {
      author: name,
      likes: authorsLikes
    }
    return blogObject
  })
  const mostLiked = blogArray.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, 0)
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}