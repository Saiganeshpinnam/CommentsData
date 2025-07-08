import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {GoArrowLeft} from 'react-icons/go'

import './index.css'

import Header from '../Header'

class ProfileScreen extends Component {
  state = {
    profilesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getProfilesData()
  }

  getProfilesData = async () => {
    const profileResponse = await fetch(
      'https://jsonplaceholder.typicode.com/users',
    )
    const statusCode = await profileResponse.statusCode
    console.log(statusCode)
    const profileJsonResponse = await profileResponse.json()
    //  console.log(profileJsonResponse)
    const formattedProfileData = profileJsonResponse.map(eachProfile => ({
      id: eachProfile.id,
      name: eachProfile.name,
      email: eachProfile.email,
      phone: eachProfile.phone,
      street: eachProfile.address.street,
      suite: eachProfile.address.suite,
      city: eachProfile.address.city,
    }))
    this.setState({
      profilesData: formattedProfileData,
      isLoading: false,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderProfileData = () => {
    const {profilesData} = this.state
    const user = profilesData[0]
    const userName = user.name
    const userId = user.id
    const userEmail = user.email
    const userPhone = user.phone
    const userStreet = user.street
    const userSuite = user.suite
    const userCity = user.city

    if (!user) {
      return null
    }
    const {name} = user
    //  console.log(name)
    const fullName = name.split(' ')
    const firstName = fullName[0]?.[0] || ''
    const lastName = fullName[1]?.[0] || ''

    return (
      <div className="welcome-user-container">
        <div className="back-container">
          <Link to="/">
            <GoArrowLeft className="back-icon" />
          </Link>
          <p className="welcome-greet">Welcome, {profilesData[0].name}</p>
        </div>
        <div className="user-profile-container">
          <div className="profile-pic-name-container">
            <div className="profile-pic-container">
              <p className="user-initial">{firstName}</p>
              <p className="user-initial">{lastName}</p>
            </div>
            <div className="name-mail-container">
              <p className="profile-name">{userName}</p>
              <p className="profile-mail">{userEmail}</p>
            </div>
          </div>
          <div className="data-categories-container">
            <div className="category-container">
              <p className="category-label">User ID</p>
              <div className="category-value-container">
                <p className="category-value">{userId}</p>
              </div>
            </div>
            <div className="category-container">
              <p className="category-label">Emalil ID</p>
              <div className="category-value-container">
                <p className="category-value">{userEmail}</p>
              </div>
            </div>
            <div className="category-container">
              <p className="category-label"> Phone </p>
              <div className="category-value-container">
                <p className="category-value">{userPhone}</p>
              </div>
            </div>
            <div className="category-container">
              <p className="category-label">Name</p>
              <div className="category-value-container">
                <p className="category-value">{userName}</p>
              </div>
            </div>
            <div className="category-container">
              <p className="category-label">Address</p>
              <div className="category-value-container">
                <p className="category-value">{userStreet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, profilesData} = this.state

    return (
      <div className="profile-bg-container">
        <Header userData={profilesData[0]} />
        <div className="profile-section-bg">
          {isLoading ? this.renderLoadingView() : this.renderProfileData()}
        </div>
      </div>
    )
  }
}

export default ProfileScreen
