import React from 'react';
import { LANGUAGES } from '../utils/translations';

const Header = ({ language, setLanguage }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Virtual Banking Assistant</div>
        <div className="header-right">
          <div className="branding">Kyndryl Finovate with Bhashini 2025</div>
          <div className="language-selector">
            <span>🌐</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

