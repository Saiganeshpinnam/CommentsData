import {Component} from 'react'

import {GoSearch} from 'react-icons/go'

import Header from '../Header'

import CommentItem from '../CommentItem'

import './index.css'

class CommentsDashboard extends Component {
  state = {
    commentsData: [],
    originalCommentsData: [],
    searchInput: '',
    sortBy: null,
    sortOrder: 'none',
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
      originalCommentsData: formattedData,
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

  getNextSortOrder = currentOrder => {
    if (currentOrder === 'none') {
      return 'asc'
    }
    if (currentOrder === 'asc') {
      return 'desc'
    }
    return 'none'
  }

  handleSort = sortKey => {
    this.setState(prevState => {
      const nextOrder =
        prevState.sortBy === sortKey
          ? this.getNextSortOrder(prevState.sortOrder)
          : 'asc'
      let sortedData = []
      if (nextOrder === 'none') {
        sortedData = prevState.originalCommentsData
      } else {
        sortedData = [...prevState.commentsData].sort((a, b) => {
          const valA = a[sortKey].toString().toLowerCase()
          const valB = b[sortKey].toString().toLowerCase()
          if (valA < valB) {
            return nextOrder === 'asc' ? -1 : 1
          }
          if (valA > valB) {
            return nextOrder === 'asc' ? 1 : -1
          }
          return 0
        })
      }
      return {
        commentsData: sortedData,
        sortBy: sortKey,
        sortOrder: nextOrder,
      }
    })
  }

  render() {
    const {commentsData, searchInput} = this.state
    const searchResults = commentsData.filter(eachCommentData =>
      `${eachCommentData.name} ${eachCommentData.email} ${eachCommentData.comment}`
        .toLocaleLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <Header />
        <div className="comments-bg-container">
          <div className="filtering-container">
            <div className="btns-container">
              <button
                type="button"
                className="sort-btn"
                onClick={() => this.handleSort('postId')}
              >
                Sort Post ID
              </button>
              <button
                type="button"
                className="sort-btn"
                onClick={() => this.handleSort('name')}
              >
                Sort Name
              </button>
              <button
                type="button"
                className="sort-btn"
                onClick={() => this.handleSort('email')}
              >
                Sort Email
              </button>
            </div>
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
