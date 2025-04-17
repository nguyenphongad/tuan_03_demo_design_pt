import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../Api/ChatRequest'
import Convertsation from '../Components/Convertsation/Convertsation';
import ChatBox from '../Components/chats/ChatBox';

import { io } from "socket.io-client"

const Chat = () => {

    const user = useSelector((state) => state.authReducer.authData);

    const socket = useRef();

    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);


    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit("new-user-add", user.checkUser._id)
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users)
        })
    }, [user]);


    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage)
        }
    }, [sendMessage]);


    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log(data)
            setReceivedMessage(data)
        })
    }, []);


    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user.checkUser._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    useEffect(() => {
        const getChat = async () => {
            try {
                const { data } = await userChats(user.checkUser._id);
                setChats(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChat();
    }, [user._id])


    console.log(receivedMessage)




    return (
        <div className='chat_container'>
            <div className='chat_box'>
                {
                    chats.map((chat) => {
                        return (
                            <div onClick={() => setCurrentChat(chat)} key={chat._id}>
                                <Convertsation
                                    data={chat}
                                    currentUser={user.checkUser._id}
                                    online={checkOnlineStatus(chat)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className='box_width_content'>
                <ChatBox
                    chat={currentChat}
                    currentUser={user.checkUser._id}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    )
}

export default Chat