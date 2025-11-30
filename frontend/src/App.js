import React, { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { getText } from './utils/translations';

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
        <p>{getText('madeWith', language)} ❤️ {getText('by', language)} <span className="team-name">{getText('teamName', language)}</span></p>
      </footer>
    </div>
  );
}

export default App;

