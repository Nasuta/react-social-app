
import './App.css';
import React, { useState } from 'react';
// import Router from './views/Router'
import AppRotes from './routes/AppRoutes'
import AppNav from './components/AppNav'
import axios from 'axios';

function App() {

  const [user, setUser] = useState (JSON.parse(localStorage.getItem('user')))
   axios.defaults.headers.common['Authorization'] ="Bearer" + (user?user.jwt_token:"")
 

  return (
    <div className="App">
    
      <AppNav user={user} setUser={setUser} />
      <AppRotes user={user} setUser={setUser} />

     
      {/* <Router/> */}
      
    </div>
  );
}

export default App;





