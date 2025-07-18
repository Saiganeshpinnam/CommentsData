import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {GoSearch} from 'react-icons/go'

import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import CommentItem from '../CommentItem'

import Header from '../Header'

import './index.css'

class CommentsDashboard extends Component {
  state = {
    commentsData: [],
    originalCommentsData: [],
    searchInput: '',
    sortBy: null, // 'postId', 'name', 'email'
    sortOrder: 'none', // 'asc', 'desc', 'none'
    pageNumber: 1,
    commentsCountPerPage: 10,
    isLoading: true,
    userData: null,
  }

  componentDidMount() {
    const savedPage = localStorage.getItem('pageNumber')
    const savedSortedOrder = localStorage.getItem('sortOrder')
    const savedSortBy = localStorage.getItem('sortBy')
    const savedSearchInput = localStorage.getItem('searchInput')
    this.setState(
      {
        pageNumber: savedPage ? JSON.parse(savedPage) : 1,
        sortOrder: savedSortedOrder ? JSON.parse(savedSortedOrder) : 'none',
        sortBy: savedSortBy ? JSON.parse(savedSortBy) : null,
        searchInput: savedSearchInput || '',
      },
      () => {
        this.getCommentsData()
        this.getUserData()
      },
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const {pageNumber, sortOrder, sortBy} = this.state
    if (prevState.pageNumber !== pageNumber) {
      localStorage.setItem('pageNumber', JSON.stringify(pageNumber))
    }
    if (prevState.sortOrder !== sortOrder) {
      localStorage.setItem('sortOrder', JSON.stringify(sortOrder))
    }
    if (prevState.sortBy !== sortBy) {
      localStorage.setItem('sortBy', JSON.stringify(sortBy))
    }
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
    const {sortBy, sortOrder, searchInput} = this.state
    let filteredData = formattedData
    if (searchInput) {
      filteredData = formattedData.filter(eachComment =>
        `${eachComment.name} ${eachComment.email} ${eachComment.comment}`
          .toLowerCase()
          .includes(searchInput.toLowerCase()),
      )
    }
    if (sortOrder !== 'none' && sortBy) {
      filteredData.sort((a, b) => {
        const valA = a[sortBy] ? a[sortBy].toString().toLowerCase() : ''
        const valB = b[sortBy] ? b[sortBy].toString().toLowerCase() : ''
        if (valA < valB) {
          return sortOrder === 'asc' ? -1 : 1
        }
        if (valA > valB) {
          return sortOrder === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    this.setState({
      commentsData: filteredData,
      originalCommentsData: formattedData,
      isLoading: false,
    })
  }

  getUserData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    this.setState({
      userData: data[0],
    })
  }

  onClickSearchIcon = () => {
    const {originalCommentsData, searchInput} = this.state
    const filteredResults = originalCommentsData.filter(eachCommentData =>
      `${eachCommentData.name} ${eachCommentData.email} ${eachCommentData.comment}`
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    this.setState({
      commentsData: filteredResults,
      pageNumber: 1,
    })
  }

  onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      this.onClickSearchIcon()
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
    localStorage.setItem('searchInput', event.target.value)
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

  onSelectingOption = event => {
    const selectedOption = event.target.value
    let number = ''
    for (let i = 0; i < selectedOption.length; i += 1) {
      if (
        parseInt(selectedOption[i]) >= 0 &&
        parseInt(selectedOption[i]) <= 9
      ) {
        number += selectedOption[i]
      }
    }
    const userSelectedPages = parseInt(number)
    this.setState({
      commentsCountPerPage: userSelectedPages,
    })
  }

  render() {
    const {
      commentsData,
      searchInput,
      pageNumber,
      isLoading,
      userData,
      commentsCountPerPage,
    } = this.state

    const searchResults = commentsData

    const totalPages = Math.ceil(searchResults.length / commentsCountPerPage)
    const startIndex = (pageNumber - 1) * commentsCountPerPage
    const endIndex = startIndex + commentsCountPerPage
    const paginatedResults = searchResults.slice(startIndex, endIndex)

    return (
      <div className="bg-container">
        <Header userData={userData} />
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
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownSearch}
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
          <select onChange={this.onSelectingOption}>
            <option className="page-option">10/Page</option>
            <option className="page-option">50/Page</option>
            <option className="page-option">100/Page</option>
          </select>
        </div>
      </div>
    )
  }
}

export default CommentsDashboard
