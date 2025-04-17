import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../Api/UserRequest';
import { addMessage, getMessages } from '../../Api/MessageRequest';

import { format as formatMessage } from "timeago.js"
import InputEmoji from "react-input-emoji"

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const scroll = useRef();
    // console.log(receivedMessage)


    const hanleChangeInputMessage = (newMess) => {
        setNewMessage(newMess.target.value);
    }

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);

        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData();

    }, [chat, currentUser]);

    // console.log(chat)

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const { data } = await getMessages(chat._id)
                setMessages(data);

                // console.log(data)

            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchMessage();
    }, [chat]);


    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id
        }

        const receiverId = chat.members.find((id) => id !== currentUser);

        setSendMessage({ ...message, receiverId });

        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");

        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        // console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage])
        }
    }, [receivedMessage]);


    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])



    return (
        <div className='container_content_chat'>
            {chat ? (
                <>
                    <div className='name_rev'>
                        {userData?.firstname} {userData?.lastname}
                    </div>
                    <div className='chat_body'>
                        {messages.map((message) => {
                            return (
                                <div 
                                key={message._id} 
                                className={`line_item_chat ${message.senderId === currentUser ? "line_item_send" : "line_item_rev"}`}
                                ref={scroll}
                                >
                                    <div className={`item_chat ${message.senderId === currentUser ? "item_send" : "item_rev"}`}>
                                        <div style={{ wordWrap: 'break-word' }}> {message.text}</div>
                                        <div className='time_at_send'> {formatMessage(message.createdAt)} </div>
                                    </div>

                                </div>
                            )
                        })}


                    </div >
                    <div className='row_button_send'>
                        <button>+</button>
                        <input
                            placeholder='type a message...'
                            value={newMessage}
                            onChange={hanleChangeInputMessage}
                        />
                        <button onClick={handleSend}>send</button>
                    </div>
                </>

            ) : <div>click chat</div>}



        </div>
    )
}

export default ChatBox