const axios = require('axios');

import { useState, useEffect } from 'react';

export default function ({gh}){
    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [status, setStatus] = useState('');
    const [owner, setOwner] = useState('');
    const [repos, setRepos] = useState([]);
    const [av, setAV] = useState('/images/github.png');

    useEffect( ()=>{
        console.log(gh.data.items[0]);
        setOwner(gh.data.items[0].owner.login);
        setRepos(gh.data.items);
        setAV(gh.data.items[0].owner.avatar_url);
    }, []);

    function setAppName(e){
        setName(e.target.value);
    }

    function setAppDomain(e){
        setDomain(e.target.value);
    }

    async function deploy(){
        console.log('Deploying')
        var isDomainTaken = true;

        await axios.get('http://localhost:3030/api/apps/check/domain?domain='+domain).then(resp => {
            console.log(resp);
            setStatus(resp.data.statusMessage);
            isDomainTaken = resp.data.status; 
        });

        console.log('Is domain taken? '+isDomainTaken)
    }

    return (
        <div className="dropdownOption">
            
            <p>Project name</p>
            <input onChange={setAppName} placeholder="Project-name" type="text" />
            <br/>
            <p>Choose domain</p>
            <input onChange={setAppDomain} placeholder="Domain" type="text" />
            <select>
                <option>.freeapphosting.co</option>
            </select>
            <p>Choose repo</p>
            <a className="running"><img style={{borderRadius: '30px' }}width="32px" src={av} />{owner}       
            <div>
            <select style={{marginLeft: '1rem', background: 'white'}}>
                {repos.map( (val, i) => {
                    return <option key={i}>{val.name} @{val.default_branch}</option>;
                })}
            </select>
            </div>
            </a>
            <div>
            <br/>
            <input placeholder="Source folder"></input>
            <small style={{color: 'gray'}}>Leave blank if in root directory. </small>
            <br/>
            </div>
            <p>Run command</p>
            <input placeholder="node app.js"></input>
            <a href="../help"><small style={{color: 'gray'}}>Typically node [start_script]</small></a>
            <p>Port</p>
            <input type="number" placeholder="3030"></input>
            <small style={{color: 'gray'}}>The port your app is running on.</small>

            <br/>
            <br/>
            <br/>
            <br/>

            <a onClick={ ()=>{ deploy() }}className="github-deploy">🚀 Deploy App</a>



        </div>
    )
}