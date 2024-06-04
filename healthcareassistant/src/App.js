import React, { useState } from 'react';
import axios from 'axios';
import ChatbotInterface from './ChatbotInterface';
import Sidebar from './Sidebar';
import Login from './Login';
import './App.css';
import './Sidebar.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user] = useAuthState(auth);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleChatResponse = async (message) => {
    try {
      // Send the user's message to the backend
      const response = await axios.post('/chat', { message });
      // Return the assistant's response
      return response.data.response;
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, there was an error processing your request.';
    }
  };

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <div className="app-container">
            <button onClick={toggleSidebar} className="sidebar-toggle">☰</button>
            <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
              <Sidebar />
            </div>
            <Routes>
              <Route path="/chat/:roomId" element={<ChatbotInterface onChatResponse={handleChatResponse} />} />
              <Route path="*" element={<Navigate to="/chat/:roomId" replace />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;