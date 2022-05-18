import { useEffect, useState } from "react"
const axios = require('axios');
import { useRouter } from 'next/router'

export default function (){
    const [activity, setActivity] = useState([]);
    const [state, setState] = useState('offline');
    const [live, setLive] = useState(0);
    const router = useRouter()
    const { name } = router.query;
    var moment = require('moment');

    useEffect( ()=>{
        console.log('appid: '+name);
        axios.get("http://localhost:3030/api/apps/activity?appID="+name).then(response2 =>{
            setActivity(response2.data);
            setState(response2.data.health.state);
            setLive(response2.data.liveSince)
         });
    }, []);

    function rebuild(){
        console.log('rebuilding...');
        axios.post("http://localhost:3030/api/apps/functions/rebuild?appID="+name).then(_data =>{
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

    return (
        <div className="dropdownOption">
            <h3>Actions</h3>
            <div className="manage">
                <a className="gray-button" onClick={rebuild}>Deploy</a>
                <a className="gray-button" onClick={restart}>Restart</a>
                <a className="gray-button" onClick={stop}>Stop</a>
            </div>
            <h3>App Health</h3>
            <a className="running"><img width="16px" src="/images/correct.png"/> App is {state}</a>          
            <h3>Deployment Info</h3>
            <a className="running"><img width="16px" src="/images/correct.png"/> Online since { moment.unix( live/1000).fromNow()}</a>
            <br/>            
            <a className="online"><img width="16px" src="/images/world-wide-web.png"/> URL: {activity.url}</a>            

        </div>
    )
}