import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useRef } from "react";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const [targetUserOnline, setTargetUserOnline] = useState(false);
  const [targetUserLastSeen, setTargetUserLastSeen] = useState(null);

  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const socketRef = useRef(null);

  //TimeStamp Logic
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "";
    }

    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      // Showing actual date for older messages
      return messageTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year:
          messageTime.getFullYear() !== now.getFullYear()
            ? "numeric"
            : undefined,
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        photoUrl: senderId.photoUrl,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    //Creating socket connection once and storing it in a useRef
    const socket = createSocketConnection();
    socketRef.current = socket;

    //As soon as the page loaded the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    //Listen for incoming messages
    socket.on(
      "messageReceived",
      ({ firstName, lastName, photoUrl, text, createdAt }) => {
        console.log(firstName, " " + text);

        if (firstName !== user.firstName || lastName !== user.lastName) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { firstName, lastName, photoUrl, text, createdAt },
          ]);
        }
      }
    );

    // Listen for online status updates

    socket.on(
      "userOnlineStatus",
      ({ userId: statusUserId, isOnline, lastSeen }) => {
        console.log(
          "Received online status:",
          statusUserId,
          isOnline,
          lastSeen
        );
        if (statusUserId === targetUserId) {
          setTargetUserOnline(isOnline);
          setTargetUserLastSeen(lastSeen);
        }
      }
    );

    //Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    //Using the socket connection stored in useRef

    if (socketRef.current && newMessage.trim() !== "") {
      //Immediately adding the message to the local state(optimistic update)

      const newMsg = {
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        text: newMessage,
        createdAt: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);

      //Then emiting to socket
      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        userId,
        targetUserId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="w-2/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      {/*Chat Header with Online Status */}
      <div className="p-5 border-b border-gray-600 flex items-center gap-3">
        <div className="relative">
          {/* Avatar placeholder */}

          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-white text-sm">👤</span>
          </div>

          {/*  Green dot indicator*/}
          {targetUserOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          )}
        </div>

        {/* Status text */}

        <p className="text-xs text-gray-400">
          {targetUserOnline ? (
            <span className="text-green-500"> Online</span>
          ) : targetUserLastSeen ? (
            <span> Last seen: {formatTimestamp(targetUserLastSeen)}</span>
          ) : (
            <span> Offline</span>
          )}
        </p>
      </div>

      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat" +
                (user.firstName === msg.firstName ? " chat-end" : " chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={msg.photoUrl}
                  />
                </div>
              </div>

              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50">
                  {formatTimestamp(msg.createdAt)}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-5 border-t border-gray-200 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>

        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
