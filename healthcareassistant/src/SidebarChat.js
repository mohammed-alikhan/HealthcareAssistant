import React from 'react';
import "./SidebarChat.css"
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

function SidebarChat({ id, name, addNewChat }) {
  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");
    const user = auth.currentUser;

    if (roomName && user) {
      try {
        const chatRef = await addDoc(collection(db, "chats"), {
          name: roomName,
          userId: user.uid, // Associate chat with the user who created it
          createdAt: serverTimestamp(),
        });
        // After creating the new chat document, add a welcome message to the messages subcollection
        await addDoc(collection(db, "chats", chatRef.id, "messages"), {
          message: "Welcome to the new chat!",
          userId: "system", // Indicating system message
          createdAt: serverTimestamp(),
        });
        // console.log("New chat created with ID:", chatRef.id);
      } catch (error) {
        console.error("Failed to create chat:", error);
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/chat/${id}`}>
      <div className='sidebarchat'>
        <div className="sidebarchat_info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  ) : (
    <div className='sidebarchat'>
      <button className="new-chat-button" onClick={createChat}>Create new chat +</button>
    </div>
  );
}
export default SidebarChat;
