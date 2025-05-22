import React from 'react';
import './App.css';
import VirtuCubeContainer from './components/VirtuCube/VirtuCubeContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> VirtuCube
            </div>
            <div className="nav-links">
              <button className="btn">Help</button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <VirtuCubeContainer />
      </main>
    </div>
  );
}

export default App;