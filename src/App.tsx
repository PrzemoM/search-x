import React from 'react';
import './App.css';
import { Search } from './components/search/Search.tsx';

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
      </header>
    </div>
  );
}

// export default App;
