import {ApolloServer, gql} from "apollo-server"

books = [
	{
		title: "Book 1",
		author: "First Author"
	},
	{
		title: "Book 2",
		author: "Second Author"
	}
]

typeDefs = gql "
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
"

resolvers =
	Query:
		books: -> books

server = new ApolloServer {typeDefs, resolvers}

start = (port) ->
	{url} = await server.listen port
	console.log "Service started at #{url}"

try
	start 4000
catch error
	console.log error
