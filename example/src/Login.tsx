import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useRoute } from 'react-router-named-route';

const Login:React.FC = ()=> {
  const {goRoute,setQueryParams} = useRoute();
  useEffect(()=>{
    setQueryParams({q:Math.random() + ''});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div className="App">
      <button
          type="button"
          className="App-link"
          onClick={()=>{
            localStorage.setItem('myloggedin', 'true');
            goRoute('home')}}
        >
          Login
        </button>
    </div>
  );
}

export default Login;
