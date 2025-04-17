import React from 'react'
import avatar from '../Res/image_avatar/image_5.jpg'
import { useDispatch } from 'react-redux'
import { logOut } from '../Actions/AuthActions';

const ProfileCard = ({user}) => {
    const dispatch = useDispatch();

    return (
        <div className='box_profile'>
            <div className='box_card'>
                <div className='image_avatar'>
                    <img src={avatar} alt="avatar" />
                </div>
                <div>
                    {user.checkUser.firstname}  {user.checkUser.lastname} - {user.checkUser._id}
                </div>
                <div className='line_fl_number'>
                    <div>0 - followers</div>
                    <div>0 -following</div>
                </div>
                <div>
                    MY PROFILE
                </div>
                <div>
                    <button onClick={()=>dispatch(logOut())}>LOG OUT</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard