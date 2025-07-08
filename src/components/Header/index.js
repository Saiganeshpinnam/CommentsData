import './index.css'

const Header = props => {
  const {profilesData} = props
  // console.log(profilesData)
  return (
    <div className="header-container">
      <img
        src="https://res.cloudinary.com/dccbkv07a/image/upload/v1751881335/Screenshot_2025-07-07_150827_axgmpd.png"
        alt="swift-logo"
        className="logo"
      />
      <div className="profile-container" />
    </div>
  )
}

export default Header
