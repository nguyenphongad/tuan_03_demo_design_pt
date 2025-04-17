import React, { useEffect, useState } from 'react'
import { getUser } from '../../Api/UserRequest';
import { useDispatch } from 'react-redux';

const Convertsation = ({ data, currentUser, online }) => {


    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser)

        // console.log(userId)

        const getUserData = async () => {

            try {
                const { data } = await getUser(userId);
                setUserData(data);
                dispatch({ type: "SAVE_USER", data: data })

                // console.log(data)

            } catch (error) {
                console.log(error)
            }

        }
        getUserData();
    }, [])


    return (
        <div className='item_list_chat'>
            <div className='name_list_chat'>{userData?.firstname} {userData?.lastname}</div>
            <div>{online? "Online" : "Offline"}</div>
        </div>
    )
}

export default Convertsation