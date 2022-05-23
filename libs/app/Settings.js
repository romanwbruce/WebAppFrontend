import { useEffect, useState } from "react"
const axios = require('axios');
import { useRouter } from 'next/router'

export default function ({auth}){
    const [settings, setSettings] = useState([]);
    const router = useRouter()
    const { name } = router.query;
    var moment = require('moment');

    useEffect( ()=>{
        console.log('appid: '+name);
        axios.get("http://localhost:3030/api/apps/settings?appID="+name, auth).then(response2 =>{
            setSettings(response2.data.data);
            console.log(settings);
         });
    }, []);

    return (
        <div className="dropdownOption">
            <div class="setting">
                <a>Created</a>
                <a className="value">{moment.unix( settings.created/1000).fromNow()}</a>
            </div>
            <div class="setting">
                <a>Project Name</a>
                <a className="value">{settings.appName}</a>
            </div>
            <div class="setting">
                <a>Run Command</a>
                <a className="value">{settings.runCommand}</a>
            </div>
            <div class="setting">
                <a>App Port</a>
                <a className="value">{settings.port}</a>
            </div>
            <div class="setting">
                <a>GitHub Repo</a>
                <a className="value">{settings.repo} @master</a>
            </div>
            <a class="err">
                <pre className="dangerzone">DANGER ZONE</pre>
                Delete
                </a>
        </div>
    )
}