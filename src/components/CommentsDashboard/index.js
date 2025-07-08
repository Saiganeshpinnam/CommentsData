import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {GoSearch} from 'react-icons/go'

import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import Header from '../Header'

import CommentItem from '../CommentItem'

import './index.css'

class CommentsDashboard extends Component {
  state = {
    commentsData: [],
    originalCommentsData: [],
    searchInput: '',
    sortBy: null, // 'postId', 'name', 'email'
    sortOrder: 'none', // 'asc', 'desc', 'none'
    pageNumber: 1,
    isLoading: true,
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
      isLoading: false,
    })
  }

  onClickSearchIcon = event => {
    if (event.key === 'Enter') {
      const {originalCommentsData, searchInput} = this.state
      const filteredResults = originalCommentsData.filter(eachCommentData =>
        `${eachCommentData.name} ${eachCommentData.email} ${eachCommentData.comment}`
          .toLowerCase()
          .includes(searchInput.toLowerCase()),
      )
      this.setState({
        commentsData: filteredResults,
      })
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

  OnclickingPreviousPage = () => {
    const {pageNumber} = this.state
    if (pageNumber === 1) {
      this.setState({
        pageNumber,
      })
    } else {
      this.setState(prevState => ({
        pageNumber: prevState.pageNumber - 1,
      }))
    }
  }

  OnclickingNextPage = () => {
    const {pageNumber} = this.state
    if (pageNumber === 50) {
      this.setState({
        pageNumber,
      })
    } else {
      this.setState(prevState => ({
        pageNumber: prevState.pageNumber + 1,
      }))
    }
  }

  render() {
    const commentsPerPage = 10

    const {commentsData, searchInput, pageNumber, isLoading} = this.state

    const searchResults = commentsData.filter(eachCommentData =>
      `${eachCommentData.name} ${eachCommentData.email} ${eachCommentData.comment}`
        .toLocaleLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    const totalPages = Math.ceil(searchResults.length / commentsPerPage)
    const startIndex = (pageNumber - 1) * commentsPerPage
    const endIndex = startIndex + commentsPerPage
    const paginatedResults = searchResults.slice(startIndex, endIndex)

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
              <GoSearch
                className="search-icon"
                onClick={this.onClickSearchIcon}
              />
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                className="input-element"
                placeholder="Search name, email, comment"
              />
            </div>
          </div>

          {isLoading ? (
            <div data-testid="loader">
              <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
            </div>
          ) : (
            <div className="comments-container">
              <div className="comments-header">
                <p className="post-section">Post ID</p>
                <p className="name-section">Name</p>
                <p className="email-section">Email</p>
                <p className="comments-section">Comment</p>
              </div>
              <ul className="comments-data-container">
                {paginatedResults.map(eachItem => (
                  <CommentItem commentData={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="pagination-container">
          <div className="pagination-elements">
            <FaLessThan
              onClick={this.OnclickingPreviousPage}
              className="page-controls"
            />
            <p className="active-page page-number">{pageNumber}</p>
            {pageNumber < totalPages && (
              <p className="page-number">{pageNumber + 1}</p>
            )}
            <FaGreaterThan
              onClick={this.OnclickingNextPage}
              className="page-controls"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CommentsDashboard
