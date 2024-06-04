import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarChat from "./SidebarChat";
import { db, auth } from "./firebaseConfig";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [user] = useAuthState(auth);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "chats"),
        where("userId", "==", user.uid) // Only fetch chats created by the logged-in user
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setRooms(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })));
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const results = rooms.filter(room => room.data.name.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredRooms(results);
  }, [searchInput, rooms]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const toggleLogoutButton = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="sidebar">
      <div className='sidebar_header' onClick={toggleLogoutButton}>
        {user && user.photoURL ? (
          <img src={user.photoURL} alt="User Avatar" className="sidebar_avatar" />
        ) : (
          <img src="/logo192.png" alt="User Avatar" className="sidebar_avatar" />
        )}
        <div className='sidebar_headerRight'>
          {user ? user.displayName || "Guest" : "Guest"}
        </div>
      </div>
      {showLogout && (
        <div className="logout_button_container">
          <button onClick={handleLogout} className="logout_button">Logout</button>
        </div>
      )}
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <input placeholder='Search or start new chat' value={searchInput} onChange={handleSearchChange} type='text' />
        </div>
      </div>
      <div className='sidebar_chats'>
        <SidebarChat addNewChat />
        {filteredRooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;