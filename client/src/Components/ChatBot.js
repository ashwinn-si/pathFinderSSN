import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import App from "../App";

export const ChatBot = () => {
    useEffect(() => {
        createChat({
            webhookUrl: 'https://iot2027.com:8443/webhook/7aabff22-747c-4927-a3eb-ae36afbc48fe/chat'
        });
    }, []);

    return (<div className="absolute top-10 left-20 z-[99]">

    </div>);
};

export default ChatBot;