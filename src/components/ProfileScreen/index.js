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
    //  console.log(statusCode)
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
    

    return (
      <div className="welcome-user-container">
        <div className="back-container">
          <Link to="/">
            <GoArrowLeft className="back-icon" />
          </Link>
          <p>Welcome, {profilesData[0].name}</p>
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
