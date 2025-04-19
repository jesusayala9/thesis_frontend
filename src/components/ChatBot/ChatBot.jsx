import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el chat está abierto o cerrado
  const [message, setMessage] = useState(""); // Controla el mensaje del usuario
  const [chatHistory, setChatHistory] = useState([]); // Almacena el historial del chat

  // Alternar la visibilidad del chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Enviar un mensaje al backend
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await axios.post("http://localhost:3001/api/chatbot", {
        userId,
        question: message,
      });

      const botReply = { sender: "bot", text: response.data.answer };
      setChatHistory((prev) => [...prev, botReply]);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error al procesar la solicitud.";
      const botReply = { sender: "bot", text: errorMessage };
      setChatHistory((prev) => [...prev, botReply]);
      console.error("Error al enviar el mensaje:", error);
    }

    setMessage(""); // Limpiar el campo de entrada
  };

  // Vaciar el historial del chat
  const clearChat = () => {
    setChatHistory([]);
  };

  // Manejar teclas Escape para minimizar el chat
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false); // Minimizar el chat al presionar Escape
    }
  };

  // Agregar y eliminar el evento de teclado para Escape
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  // Formatear el mensaje del chatbot
  const formatMessage = (text) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convertir **texto** a <strong>texto</strong>
      .replace(/\n/g, "<br />"); // Reemplazar saltos de línea con <br />
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="chatbot">
      {/* Botón flotante */}
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>BikesBot</h4> {/* Cambiado de "Chatbot" a "BikesBot" */}
          </div>
          <div className="chatbot-messages">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.sender}`}>
                {chat.sender === "bot" ? formatMessage(chat.text) : chat.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(); // Enviar mensaje al presionar Enter
                }
              }}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
          {/* Botón para vaciar el chat */}
          <button className="clear-chat-button" onClick={clearChat}>
            Vaciar chat
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;