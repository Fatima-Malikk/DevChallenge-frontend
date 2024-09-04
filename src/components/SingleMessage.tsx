import React, { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  chatid: number;
  message: string;
  userid: number;
  ts: number;
}

interface SingleMessageProps {
  messageId: number;
}

const SingleMessage: React.FC<SingleMessageProps> = ({ messageId }) => {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await axios.get(`/api/message/${messageId}`);
      setMessage(response.data);
    };
    fetchMessage();
  }, [messageId]);

  const sanitizeMessage = (message: string) => {
    return message.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  if (!message) return null;

  return (
    <div className="bg-green-100 p-4 rounded-lg">
      <p className="text-gray-800">{sanitizeMessage(message.message)}</p>
      <p className="text-sm text-gray-500">User ID: {message.userid}</p>
      <p className="text-sm text-gray-500">
        {new Date(message.ts * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default SingleMessage;
