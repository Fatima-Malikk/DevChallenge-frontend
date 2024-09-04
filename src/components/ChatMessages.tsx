import React, { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  chatid: number;
  message: string;
  userid: number;
  ts: number;
}

interface ChatMessagesProps {
  chatId: number;
  asJson?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chatId,
  asJson = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`/api/messages/${chatId}`);
      setMessages(response.data);
    };
    fetchMessages();
  }, [chatId]);

  const sanitizeMessage = (message: string) => {
    return message.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  if (asJson) {
    const sanitizedMessages = messages.map((msg) => ({
      ...msg,
      message: sanitizeMessage(msg.message),
    }));
    return <pre>{JSON.stringify(sanitizedMessages, null, 2)}</pre>;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-800">{sanitizeMessage(message.message)}</p>
          <p className="text-sm text-gray-500">User ID: {message.userid}</p>
          <p className="text-sm text-gray-500">
            {new Date(message.ts * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
