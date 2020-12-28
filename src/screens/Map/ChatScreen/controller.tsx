import React, {useEffect, useState} from 'react';
import ChatScreenView from "./view";

const ChatScreenController = ({SendPush, newOrder, messages, SetMessagesRead}: any) => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        SetMessagesRead();
    }, [])

    function sendMsg() {
        SendPush({
            user_id: newOrder.user_id,
            title: 'message',
            message,
            type: 'clients',
            read: true,
        }, () => {
            setMessage('')
        });
    }

    return (
        <ChatScreenView
            sendMsg={sendMsg}
            message={message}
            setMessage={setMessage}
            messages={messages}
        />
    );
};

export default ChatScreenController;
