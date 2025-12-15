import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([{ text: "Hello World!" }]);

  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);

  const userId = user?._id;

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    //As soon as the page loaded the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };
  console.log(targetUserId);
  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div className="chat chat-start">
                <div className="chat-header">
                  Narendra Lama
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div className="chat-bubble">Just do it</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-200 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray 500 text-white rounded p-2"
        ></input>

        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
