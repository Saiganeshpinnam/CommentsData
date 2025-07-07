import {Component} from 'react'

import {GoSearch} from 'react-icons/go'

import Header from '../Header'

import CommentItem from '../CommentItem'

import './index.css'

class CommentsDashboard extends Component {
  state = {
    commentsData: [],
    searchInput: '',
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

  onClickSearchIcon = event => {
    if (event.key === 'Enter') {
      this.getCommentsData()
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

 // const sortingWays = ['no sort', 'ascending', 'descending', 'no sort']

  onClickingSortBtn = () => {
   const descendingOrder = commentsData.name.sort((a, b) => b - a)
    this.setState({
      commentsData: descendingOrder,
    })
  }

  render() {
    const {commentsData, searchInput} = this.state
    const searchResults = commentsData.filter(eachCommentData =>
      eachCommentData.name.includes(searchInput),
    )

    return (
      <div className="bg-container">
        <Header />
        <div className="comments-bg-container">
          <div className="filtering-container">
            <button
              type="button"
              className="sort-btn"
              onClick={this.onClickingSortBtn}
            >
              Sort Name
            </button>
            <div className="input-container">
              <GoSearch className="search-icon" />
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onClickSearchIcon}
                className="input-element"
                placeholder="Search name, email, comment"
              />
            </div>
          </div>

          <div className="comments-container">
            <div className="comments-header">
              <p className="post-section">Post ID</p>
              <p className="name-section">Name</p>
              <p className="email-section">Email</p>
              <p className="comments-section">Comment</p>
            </div>
            <ul className="comments-data-container">
              {searchResults.map(eachItem => (
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
