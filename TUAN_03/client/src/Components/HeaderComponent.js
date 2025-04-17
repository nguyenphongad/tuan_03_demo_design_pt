import React from 'react'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
    return (
        <div className='header_container'>
            <div className='logo'>
                LOGO
            </div>
            <div className='menu_flex'>
                <Link to="/home" >HOME</Link>
                <Link to="/chat" >MESSAGE</Link>
            </div>
        </div>
    )
}

export default HeaderComponent