import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

function App() {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [language, setLanguage] = useState('en');

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} />
      <div className="app-container">
        <ChatInterface sessionId={sessionId} language={language} />
      </div>
      <footer className="app-footer">
        <p>Made with ❤️ by <span className="team-name">Team Exception</span></p>
      </footer>
    </div>
  );
}

export default App;

