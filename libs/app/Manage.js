import { useEffect, useState } from "react"
const axios = require('axios');
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function (){
    const [activity, setActivity] = useState([]);
    const [state, setState] = useState('offline');
    const [live, setLive] = useState(0);
    const [signer, setSigner] = useState('');
    const [restartText, setRestartText] = useState('Restart');

    const router = useRouter()
    const { name } = router.query;
    var moment = require('moment');
    
    useEffect(  ()=>{
        setRestartText( state == "running" ? 'Restart' : 'Start');
    }, [state]);

    useEffect( ()=>{
        console.log('appid: '+name);
        setSigner(Cookies.get('signer'));
        axios.get("http://localhost:3030/api/apps/activity?appID="+name).then(response2 =>{
            setActivity(response2.data);
            setState(response2.data.health.state);
            setLive(response2.data.liveSince)
         });
    }, []);

    function rebuild(){
        console.log('rebuilding...');
        axios.post("http://localhost:3030/api/apps/functions/rebuild?appID="+name+"&owner="+Cookies.get('signer')).then(_data =>{
          console.log(_data);
         });
    }

    function restart(){
        console.log('restarting...');
        axios.post("http://localhost:3030/api/apps/functions/restart?appID="+name).then(_data =>{
          console.log(_data);
         });
    }

    function stop(){
        console.log('stopping...');
        axios.post("http://localhost:3030/api/apps/functions/stop?appID="+name).then(_data =>{
          console.log(_data);
         });
    }

    //                <a className="running"><img width="16px" src="/images/file-storage.png"/> Connected to repo demo1</a>     


    return (
        <div className="dropdownOption">
            <div className="usages">
                <div className="usage">
                    <p className="usageLabel">CPU USAGE</p>
                    <pre>{activity.cpuUsage}</pre>
                </div>
                <div className="usage">
                <p className="usageLabel">MEMORY USAGE</p>
                    <pre>{activity.memUsage}</pre>
                </div>
                <div className="usage">
                <p className="usageLabel">I/O USAGE</p>
                    <pre>{activity.networkUsage}</pre>
                </div>
            </div>
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
    )
}