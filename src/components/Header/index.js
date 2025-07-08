import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {userData} = props
  if (!userData) {
    return null
  }
  const {name} = userData
  //  console.log(name)
  const fullName = name.split(' ')
  const firstName = fullName[0]?.[0] || ''
  const lastName = fullName[1]?.[0] || ''
  //  console.log(firstName)
  // console.log(lastName)
  return (
    <div className="header-container">
      <img
        src="https://res.cloudinary.com/dccbkv07a/image/upload/v1751881335/Screenshot_2025-07-07_150827_axgmpd.png"
        alt="swift-logo"
        className="logo"
      />
      <Link to="/profile-screen" className="user-name-container">
        <div className="profile-pic-container">
          <p className="user-initial">{firstName}</p>
          <p className="user-initial">{lastName}</p>
        </div>
        <p className="user-name">{name}</p>
      </Link>
    </div>
  )
}

export default Header
