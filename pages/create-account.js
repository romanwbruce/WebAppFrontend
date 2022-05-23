import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';


export default function CreateAccount(){

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

                <input placeholder="Email" type="text" />
             
                <input placeholder="Password" type="password" />
        
                <input placeholder="Confirm Password" type="password" />
        </div>
              <div className="deploy">
                <a className="github-deploy">Create Account</a>
              </div>
          </div>
          </div>
          <br/>
            <Footer/>

        </div>
    )
}