import { useEffect, useState } from "react"
const axios = require('axios');
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Countdown from 'react-countdown';
import { ClimbingBoxLoader, FadeLoader, HashLoader, CircleLoader, ClockLoader } from 'react-spinners';


function Spinner ({t}){
    return (
        <div>
            <div className="spinner_">
                <a>Working</a>
                <ClimbingBoxLoader></ClimbingBoxLoader>
            </div>
            <small>Please wait 10-15 seconds before attemping commands again.</small>
        </div>
    )
}
function ShowLoading({setLoadingFunction}){
    function stop(){
        setLoadingFunction(false);
        window.location.reload(false);
    }
    return (
            <div>
            <Countdown 
            onComplete={stop}
            renderer={props => <div>
                    <Spinner t={props.total}></Spinner>
            </div>}
        date={Date.now() + 10000}>
            
        </Countdown>
        </div>
    )
}
export default function ({ setRealName, auth }){
    const [activity, setActivity] = useState([]);
    const [state, setState] = useState('offline');
    const [live, setLive] = useState(0);
    const [signer, setSigner] = useState('');
    const [restartText, setRestartText] = useState('Restart');
    const[loading, setLoading] = useState(false);

    const router = useRouter()
    const { name } = router.query;
    var moment = require('moment');
    
    useEffect(  ()=>{
        setRestartText( state == "running" ? 'Restart' : 'Start');

    }, [state]);

    useEffect( ()=>{
        console.log('appid: '+name);
        setSigner(Cookies.get('signer'));
        axios.get("http://159.223.194.251/api/apps/activity?appID="+name, auth).then(response2 =>{
            if(response2.data.status != false){
                setActivity(response2.data);
                setState(response2.data.health.state);
                console.log(response2.data.appName);
                setRealName(response2.data.url);
                setLive(response2.data.liveSince)
            }
         });
    }, []);

    function rebuild(){
        console.log('rebuilding...');
        axios.post("http://159.223.194.251/api/apps/functions/rebuild?appID="+name+"&owner="+Cookies.get('signer'), {}, auth).then(_data =>{
          console.log(_data);
         });
         setLoading(true);
    }

    function refresh_dev(){
        setLoading(true);
    }

    function restart(){
        setLoading(true);
        console.log('restarting...');
        axios.post("http://159.223.194.251/api/apps/functions/restart?appID="+name).then(_data =>{
          console.log(_data);
         });
    }

    function stop(){
        setLoading(true);
        console.log('stopping...');
        axios.post("http://159.223.194.251/api/apps/functions/stop?appID="+name).then(_data =>{
          console.log(_data);
         });
    }

    //                <a className="running"><img width="16px" src="/images/file-storage.png"/> Connected to repo demo1</a>     

      
    
    

    return (
        <div>
             { loading &&
            <div>
               <ShowLoading setLoadingFunction={setLoading}></ShowLoading>
            </div>
        }
        { !loading && 
        <div className="dropdownOption">
                        <h3>App Health</h3>
                {
                    state == "running" &&
                    <div className="usages">

                <div className="usage">
                    <p className="usageLabel">CPU Usage</p>
                    <pre>{activity.cpuUsage}</pre>
                </div>
                <div className="usage">
                <p className="usageLabel">Memory Usage</p>
                    <pre>{activity.memUsage}</pre>
                </div>
                <div className="usage">
                <p className="usageLabel">Network Usage</p>
                    <pre>{activity.networkUsage}</pre>
                </div>
                    </div>
                }
                {
                    state != "running" &&
                    <div>
                        <br/>
                        <a className="err">
                        <pre className="dangerzone">APP IS OFFLINE</pre>
                        Your app is offline and no metrics can be displayed.
                        </a>
                    </div>
                }
            <h3>Control</h3>
            <div className="manage">
                <a className="gray-button" onClick={rebuild}>Rebuild</a>
                <a className="gray-button" onClick={restart}>{restartText}</a>
                <a className="gray-button" onClick={stop}>Stop</a>
            </div>
            <div style={{marginTop: '1rem'}}>
                {
                    state != "running" &&
                    <a className="error">App is {state}</a>  
                }
                 {
                    state == "running" &&
                    <a className="running"><img width="16px" src="/images/correct.png"/> App is {state}</a>  
                }
            </div>  
            <h3>Deployment Info</h3>   
            <a className="running"><img width="16px" src="/images/correct.png"/> Last successful build: { moment.unix( live/1000).fromNow()}</a>
            <br/>            
            <a className="online"><img width="16px" src="/images/world-wide-web.png"/> URL: {activity.url}</a>            

        </div>
    }
        </div>
    )
}