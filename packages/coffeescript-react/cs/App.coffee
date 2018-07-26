import React, {Component, Fragment} from "react"

export default class App extends Component
  state:
    count: 0
    posts: []
    searchQuery: ""
  
  incrementCount: =>
    this.setState { count: this.state.count + 1}

  decrementCount: =>
    if this.state.count > 0 then this.setState { count: this.state.count - 1}

  updateSearch: (event) =>
    this.setState {searchQuery: event.target.value}

  componentDidMount: =>
    response = await fetch "https://jsonplaceholder.typicode.com/posts"
    json = await do response.json
    this.setState { posts: json }
  
  render: ->
    <Fragment>
      <h1>Counter</h1>
      <h1>{this.state.count}</h1>
      <button onClick={this.incrementCount}>+ Increment</button>
      <button onClick={this.decrementCount}>- Decrement</button>
      {if this.state.count <= 0 then <h1>Can't go any lower low!</h1>}
      <h1>Social Stuff</h1>
      <input type="text" placeholder="Search ..." value={this.state.searchQuery} onChange={this.updateSearch}/>
      {<PostCard key={index} title={post.title} search={this.state.searchQuery}>{post.body}</PostCard> for post, index in this.state.posts}
    </Fragment>

PostCard = ({title, children, search, rest...}) ->
  if search or not search == ""
    if (title.includes search) or (children.includes search)
      <div {rest...}>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    else
      null
  else
    <div {rest...}>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>