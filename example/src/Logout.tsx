import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useRoute } from 'react-router-named-route';

const Logout:React.FC = ()=> {
  const {goRoute} = useRoute();

  useEffect(() => {
    localStorage.removeItem('myloggedin');

  goRoute('login');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  return null;
}

export default Logout;
