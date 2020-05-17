require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('useCreateIndex', true)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: (root, args) => {
      if (args.genre && args.author) {
        return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      } else if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      } else if (args.author) {
        return books.filter(book => book.author === args.author)
      }
      return Book.find({})
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const authorToCreate = new Author({ name: args.author })
        author = await authorToCreate.save()
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      const editedAuthor = author ? { ...author, born: args.setBornTo } : null
      authors = authors.map(a => a.name !== args.name ? a : editedAuthor)
      return editedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})