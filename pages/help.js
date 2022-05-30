import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';

export default function Help(){
    return(
        <div>
            <Navbar></Navbar>
            <div className="help">
                <div className="whoopsies">
                <div>
                        <a>Page coming soon</a>
                        <p>This page is under development, please join our discord for help.</p>
                        <a href="https://discord.gg/yK2B2SJymW">Discord</a>
                      
                </div>
           </div>
           <br/>
            </div>
            <Footer></Footer>
        </div>
    )
}