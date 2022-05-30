import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';

export default function Index() {
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
                    <option>Container 1u - Free</option>
                  </select>
              </div>
              <div className="deploy">
                <a href="create-account" className="github-deploy">Continue</a>
              </div>
          </div>
        </div>

        <div className="features">
            <div className="feature">
                <h3>Free To Use</h3>
                <p>Our service is free to use, forever. Including a free domain.</p>
            </div>
            <div className="feature">
                <h3>Powerful</h3>
                <p>We use the latest enterprise grade servers to host your projects.</p>
            </div>
            <div className="feature">
                <h3>We Make It Easy</h3>
                <p>Select a project repo and deploy your web app in seconds.</p>
            </div>
            <div className="feature">
                <h3>Free Support</h3>
                <p>Join our discord to get free and extensive support!</p>
                <a href="https://discord.gg/yK2B2SJymW">[Official Discord]</a>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
