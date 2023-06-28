import "./Login.css";
import "../App.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState('')

const handleInputChange = (e) => {

  const target = e.target
  const name = target.name
  // console.log (e.target.value)

  setformData({
...formData,
[name] : target.value
  })
}

// console.log (formData)

const handleSubmit = (e) => {
  e.preventDefault()
    axios
      .post("https://akademia108.pl/api/social-app/user/login", { 
        username: formData.username,
        password:formData.password
    
      })
      .then((res) => {
        console.log(res.data);
        if(Array.isArray(res.data.username)){
          setLoginMessage(res.data.username[0])
        } else if (Array.isArray(res.data.password)){
          setLoginMessage(res.data.password[0])
        } else if (res.data.error) {
          setLoginMessage('Incorrect username or password.')
        }
        else {
          setLoginMessage('')
          
        

        props.setUser(res.data)
        localStorage.setItem('user',JSON.stringify(res.data))
      }
      })
      .catch((error) => {
        console.error(error);
      });
  };








  return (
    <div className="login">
      {/* <h2 className='MenuBarButton'>Login</h2> */}
      {props.user && <Navigate to="/"/>}
      <form onSubmit={handleSubmit}>
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}

        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
