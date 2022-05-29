import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';
const axios = require('axios');

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateAccount(){
  const [status, setStatus] = useState('Please fill out all fields.');
  const [password, setPassword]= useState('');
  const [password2, setPassword2]= useState('');
  const [email, setEmail]= useState('');
  
  const router = useRouter();


  function _setEmail(e){
      /*
       */
      return (
              setEmail(e.target.value)
             )
  }
  function _setPassword(e){
      return (
          setPassword(e.target.value)
      )
  }

  function _setPassword2(e){
      if(password2 != password){
          setStatus("Passwords don't match.");
      }
      return (
          setPassword2(e.target.value)
      )
  }

  

  async function signup() {
      //Validate... 
      if(8 > password.length){
          setStatus('Password must be 8 characters long.')
          return;
      }
      if(password2 != password){
          setStatus('Passwords must match.')
          return;
      }
      axios.get("https://api.hunter.io/v2/email-verifier?email="+email+"&api_key=0b2a43883dc3cbb6f6a0dc7fcce6c5c2b6e1ada5").then( (resp)=>{
          setStatus('Creating account, please wait.');
          finish();
      }).catch(function (error) {
          if(error.response){
              setStatus("Invalid email address.");
          }
      });
    
      }
  function finish(){
      return(
          axios.get('https://api.freeapphosting.net/api/auth/signup?username=' + email + "&password=" + password+"&email="+email).then(resp => {
              setStatus(resp.data.statusMessage);
              if(resp.data.status==true){
                router.push('../login')
              }
              return;
          })
      )    
  }
    return (
        <div>
            <Navbar/>
            <div className="parent">
        <div className="card">
              <div className="textimage">
                <img src='/images/shuttle.png' />
                <h3 className="cardTitle">Create A Free Account</h3>
              </div>
              <div className="column">
              <p>{status}</p>

                <input onChange={_setEmail} placeholder="Email" type="text" />
             
                <input onChange={_setPassword} placeholder="Password" type="password" />
        
                <input onChange={_setPassword2} placeholder="Confirm Password" type="password" />
        </div>
              <div className="deploy">
                <a onClick={signup} className="github-deploy">Create Account</a>
              </div>
          </div>
          </div>
          <br/>
            <Footer/>

        </div>
    )
}