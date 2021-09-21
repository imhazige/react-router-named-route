import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useRoute } from 'react-router-named-route';

const App:React.FC = () => {
  const {goRoute,setRouteParams} = useRoute();
  useEffect(()=>{
    const section = Math.random() + '';
    setRouteParams({section});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          type="button"
          className="App-link"
          onClick={()=>{goRoute('logout')}}
        >
          Logout
        </button>
      </header>
    </div>
  );
}

export default App;
