import './App.css';
import Login from './login.js';
import Home from './home.js';
import { MyContext } from './contextprovider.js';
import { useContext, useEffect } from 'react';

function App() {
  const{user, setUser} = useContext(MyContext);

  return (
    <div className="container">
      {user ? (
        <Home />
      ) :  (
        <Login  />
      )}
    </div>
  );
}

export default App;
