import "./App.css";
import { useState } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from "universal-cookie"
import JoinGame from './components/JoinGame'
import {Routes, Route, BrowserRouter} from 'react-router-dom'


function App() {

  
  const api_key = 'mk3h8vqjbfmx';
  const cookies = new Cookies()
  const token = cookies.get('token')
  const client = StreamChat.getInstance(api_key);
  const [auth, setAuth] = useState(false)
  const [signUp, setSignUp] = useState(true)
 
  const logOut = () =>{
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('hashedPassword');
    cookies.remove('firstName');
    cookies.remove('lastName');
    cookies.remove('chanelName');
    client.disconnectUser();
    setAuth(false);
  }
 
  if(token){
    client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      firstName: cookies.get('firstName'),
      lastName: cookies.get('lastName'),
      hashedPassword: cookies.get('hashedPassword')
    }, token
    ).then((res)=>{
      console.log(res);
      setAuth(true)
    })
  }


  return (
    <div className="App">
      {auth ? 
      <div className="RegisterForm join">
      <Chat client={client}>
        
        <JoinGame logOut={logOut}/>
      </Chat>
      </div>
      :
      <div className="general">
      <h1 className="register__title">tic tac toe!</h1>
      
      <div className="RegisterForm">
        
        {signUp ? 
          <SignUp setIsAuth={setAuth}/>:
          <Login setIsAuth={setAuth}/>
        }
         <div className="nav__bar">
        <button className="nav" onClick={()=>{
          setSignUp(true)
        }}>Sign Up</button>
        <button className="nav" onClick={()=>{
          setSignUp(false)
        }}>Login</button>
      </div>
     </div>
      </div>
      }
       
    </div>
  )
}

export default App
