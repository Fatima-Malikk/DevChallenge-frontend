import React from "react";
import ChatMessages from "./components/ChatMessages";
import UserInfo from "./components/UserInfo";
import SingleMessage from "./components/SingleMessage";

function App() {
  return (
    <div className="container  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Echo Messages for Chat ID = 3 Here as HTML
      </h1>
      <ChatMessages chatId={3} />

      <h1 className="text-2xl font-bold mt-8 mb-4">
        Render Messages for Chat ID = 8 Here as JSON
      </h1>
      <ChatMessages chatId={8} asJson />

      <h1 className="text-2xl font-bold mt-8 mb-4">
        Render User ID = 100 Here as JSON
      </h1>
      <UserInfo userId={100} />

      <h1 className="text-2xl font-bold mt-8 mb-4">
        Echo Message ID = 459 Here as HTML
      </h1>
      <SingleMessage messageId={459} />
    </div>
  );
}

export default App;
