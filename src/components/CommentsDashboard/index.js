import {Component} from 'react'

import Header from '../Header'

import CommentItem from '../CommentItem'

import './index.css'

class CommentsDashboard extends Component {
  state = {
    commentsData: [],
  }

  componentDidMount() {
    this.getCommentsData()
  }

  getCommentsData = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    )
    const statusCode = await response.statusCode
    console.log(statusCode)
    const data = await response.json()
    console.log(data)
    const formattedData = data.map(eachComment => ({
      id: eachComment.id,
      postId: eachComment.postId,
      name: eachComment.name,
      email: eachComment.email,
      comment: eachComment.body,
    }))
    this.setState({
      commentsData: formattedData,
    })
  }

  render() {
    const {commentsData} = this.state
    return (
      <div className="bg-container">
        <Header />
        <div className="comments-bg-container">
          <div className="filtering-container">
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              className="input-container"
            />
          </div>

          <div className="comments-container">
            <div className="comments-header">
              <p className="post-section">Post ID</p>
              <p className="name-section">Name</p>
              <p className="email-section">Email</p>
              <p className="comments-section">Comment</p>
            </div>
            <ul className="comments-data-container">
              {commentsData.map(eachItem => (
                <CommentItem commentData={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentsDashboard
