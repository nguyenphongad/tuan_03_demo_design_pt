import React from 'react'
import HeaderComponent from '../Components/HeaderComponent'
import ProfileCard from '../Components/ProfileCard'
import HappenBox from '../Components/post/HappenBox'

const Home = ({user}) => {
  return (
    <div className='body_container'>
      <div className="profile_component">
        <ProfileCard user={user} />
      </div>
      <div className='post_component'>
        <HappenBox />
      </div>
      <div className='trending_component'>trend</div>
    </div>
  )
}

export default Home