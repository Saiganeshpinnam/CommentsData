import {Component} from 'react'

import './index.css'

import Header from '../Header'

class ProfileScreen extends Component {
  state = {
    profilesData: [],
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
    console.log(profileJsonResponse)
    const formattedProfileData = profileJsonResponse.map(eachProfile => ({
      id: eachProfile.id,
      name: eachProfile.name,
      email: eachProfile.email,
      phone: eachProfile.phone,
      street: eachProfile.address.street,
      suit: eachProfile.address.suit,
      city: eachProfile.address.city,
    }))
    this.setState({
      profilesData: formattedProfileData,
    })
  }

  render() {
    const {profilesData} = this.state
    const userData = profilesData[0]
    const {id, name} = userData
    console.log(name)
    return (
      <div className="profile-bg-container">
        <Header profilesData={profilesData[0]} />
      </div>
    )
  }
}

export default ProfileScreen
