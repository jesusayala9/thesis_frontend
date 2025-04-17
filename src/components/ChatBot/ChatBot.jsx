import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await axios.post("http://localhost:3001/api/chatbot", {
        userId: 1, // Asegúrate de enviar el userId requerido por el backend
        question: message,
      });

      const botReply = { sender: "bot", text: response.data.answer };
      setChatHistory((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }

    setMessage("");
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;