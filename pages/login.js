import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
const axios = require('axios');

export async function getServerSideProps( {req, res} ) {

  if (req.cookies.loggedIn) {
      return {
          redirect: {
              destination: '/dashboard/home?UserAlreadySignedIn',
              permanent: false,
          },
      }
  }

  return { props: { } }
}

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Please login');
  const router = useRouter();

  function updateUsername(e){
      setUsername(e.target.value);
  }

  function updatePassword(e){
      setPassword(e.target.value);
  }

  async function verify(){
      if(6 > username.length ){
          setStatus('Invalid username.');
          return;
      }

      if(6 > password.length ){
          setStatus('Invalid password.');
          return;
      }

      axios.get('/api/login?username='+username+"&password="+password).then(resp => {
          setStatus(resp.data.response.statusMessage);
          if(resp.data.response.status){
              Cookies.set('clientToken', resp.data.response.clientToken);
              Cookies.set('loggedIn', resp.data.response.status);
              Cookies.set('signer', resp.data.response.signer);
              Cookies.set('signedOn', resp.data.response.signedOn);
              Cookies.set('email', resp.data.response.email);
              Cookies.set('joinedOn', resp.data.response.joinedOn);
              router.push('/dashboard/home');
          }
          return;
      });
  }

    return (
        <div>
            <Navbar/>
            <p className="welcome">{status}</p>
            <div className="parent">
        <div className="card">
              <div className="textimage">
                <img src='/images/shuttle.png' />
                <h3 className="cardTitle">Login</h3>
              </div>
              <div className="column">
                <input onChange={updateUsername} placeholder="Username" type="text" />
                <input onChange={updatePassword} placeholder="Password" type="password" />
              </div>
              <div className="deploy">
                <a onClick={()=>{verify()}}className="github-deploy">Sign In</a>
              </div>
              <a href="../create-account">Create Account</a>

          </div>
          </div>
          <br/>
            <Footer/>

        </div>
    )
}