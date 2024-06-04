import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatbotInterface.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addDoc, serverTimestamp, collection, query, orderBy, onSnapshot, doc, where } from "firebase/firestore"; // Add 'where'
import { db, auth } from './firebaseConfig';
import { useParams } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatbotInterface = () => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId && user) { // Check if user is authenticated
            const roomRef = doc(db, "chats", roomId);
            const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
                setRoomName(snapshot.data()?.name || "Unnamed Room");
            });

            const messagesRef = query(
                collection(db, "chats", roomId, "messages"),
                where("userId", "==", user.uid), // Filter messages by userId
                orderBy("createdAt", "asc")
            );
            const messagesUnsub = onSnapshot(messagesRef, (querySnapshot) => {
                const loadedMessages = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().createdAt?.toDate().toUTCString()
                }));
                setMessages(loadedMessages);
            });
            return () => {
                unsubscribeRoom();
                messagesUnsub();
            };
        }
    }, [roomId, user]); // Include user in dependency array

    const sendMessage = async (text, senderId) => {
        if (!roomId || !text.trim()) return;

        await addDoc(collection(db, "chats", roomId, "messages"), {
            text: text,
            userId: senderId, // Add this field
            createdAt: serverTimestamp(),
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userInput.trim()) return;

        // Send user message
        sendMessage(userInput, user?.uid || 'unknown');

        // Fetch assistant response
        try {
            const response = await axios.post('http://127.0.0.1:5000/chat', { input_text: userInput });
            const assistantResponse = response.data.response;
            sendMessage(assistantResponse, 'assistant'); // Send assistant message
        } catch (error) {
            console.error('Error handling the chat response:', error);
            sendMessage('Sorry, there was an error processing your request.', 'assistant'); // Handle errors
        }
        setUserInput(''); // Clear input field after submission
    };

    return (
        <div className="chat-interface">
            <div className='chat_header'>
                <h3 className='h3-header'>{roomName.toUpperCase()}</h3>
            </div>
            <div className="message-history">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.userId === user?.uid ? 'user' : 'assistant'}`}>
                        <div className={`message-content ${msg.userId === user?.uid ? 'user-message-content' : 'assistant-message-content'}`}>
                            {msg.text}
                            <span className="chat_timestamp">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="message-input"
                />
                <button type="submit" className="send-button">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
            <div className='chat_footer'>
                <span>This Healthcare Assistant can make mistakes. Consider taking second opinions.</span>
            </div>
        </div>
    );
};
export default ChatbotInterface;