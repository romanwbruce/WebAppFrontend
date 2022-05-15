import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';

export default function () {
  return (
    <div>
        <Navbar></Navbar>
        <div className="title">
            <h1>Deploy Your Node.js App For Free</h1>
            <p>#1 Deploy your node web apps within seconds using GitHub.</p>
        </div>

        <div className="parent">
          <div className="card">
              <div className="textimage">
                <img src='/images/shuttle.png' />
                <h3 className="cardTitle">Deploy Project</h3>
              </div>
              <div className="together">
                  <input placeholder="Project-name" type="text" />
                  <select>
                    <option>.freeapphosting.co</option>
                  </select>
              </div>
              <div className="deploy">
                <a className="github-deploy">Continue with Github</a>
              </div>
          </div>
        </div>

        <div className="features">
            <div className="feature">
                <h3>Free To Use</h3>
                <p>Our service is free to use, forever.</p>
            </div>
            <div className="feature">
                <h3>Manage Many Deployments</h3>
                <p>Deploy up to three projects for free.</p>
            </div>
            <div className="feature">
                <h3>We Make It Easy</h3>
                <p>Select a project repo and deploy your web app in seconds.</p>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
