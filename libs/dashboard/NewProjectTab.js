const axios = require('axios');

import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router';

/*
  <select style={{marginLeft: '1rem', background: 'white'}}>
                {repos.map( (val, i) => {
                    return <option value={val.name} key={i}>{val.name} @{val.default_branch}</option>;
                })}
            </select>
*/
export default function ({client, gh, auth}){

    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [port, setPort] = useState(0);
    const [source, setSource] = useState('');
    const [repo, setRepo] = useState('');
    const [runCMD, setRunCMD] = useState('');

    const [status, setStatus] = useState('');
    const [owner, setOwner] = useState('');
    const [profile, setProfile] = useState([]);
    const [repos, setRepos] = useState([]);
    const [showRepos, setShowRepos] = useState(false);

    const [av, setAV] = useState('/images/github.png');

    useEffect( ()=>{
                setOwner(gh.profile.login);
                setRepos(gh.data.items);
                setProfile(gh.profile);
    }, []);

    function setPullRepo(e){
        setRepo(e.target.value);
    }

    function setSourceFolder(e){
        setSource(e.target.value);
    }

    function setRunCommand(e){
        setRunCMD(e.target.value);
    }

    function setPortNum(e){
        setPort(e.target.value);
    }

    function setAppName(e){
        setName(e.target.value);
    }

    function setAppDomain(e){
        setDomain(e.target.value);
    }

    async function deploy(){
        console.log('Deploying')
        var isDomainTaken = true;
        console.log(auth);
        await axios.get('https://api.freeapphosting.net/api/apps/check/domain?domain='+domain, auth).then(resp => {
            console.log(resp);
            setStatus(resp.data.statusMessage);
            isDomainTaken = resp.data.status; 
        });

        console.log('Is domain taken? '+isDomainTaken)
        if(!isDomainTaken){
            launch();
        }else{
            console.log('Domain is taken, please choose another one.');
        }
    }
    
    const router = useRouter();

    async function launch(){
        axios.get('https://api.freeapphosting.net/api/apps/create'
            +'?owner='+client+''
            +'&appName='+name+''
            +'&domain='+domain+''
            +'&src='+source+''
            +'&port='+port+''
            +'&repo='+repo+''
            +'&runCommand='+runCMD+''
            , auth).then(resp => {
                console.log(resp.data);
                setStatus(resp.data.statusMessage);
                if(resp.data.status==true){
                    router.push('../../dashboard/home')
                }
        });

    
    }

    function show(){
        setShowRepos(true);
        console.log('showing...');
    }
    function disable(){
        setShowRepos(false);
    }
    return (
        <div className="dropdownOption" >
            
            <p>Project name</p>
            <input onChange={setAppName} placeholder="Project-name" type="text" />
            <br/>
            <p>Choose domain</p>
            <input onChange={setAppDomain} placeholder="Domain" type="text" />
            <select>
                <option>.freeapphosting.co</option>
            </select>
            <p>Choose repo</p>
            <a className="running"><img style={{borderRadius: '30px' }}width="32px" src={profile.avatar_url} />{profile.login}       
            <div>
    
          
            <input onClick={show} style={{marginLeft: '1rem'}} onChange={setPullRepo} placeholder='Type repo name here'></input>
                {showRepos && repos != undefined &&
                <ul className='_dropdown'>
                {repos.map( (val, i) => {
                    if(val.name.includes(repo)){
                        if(val.name == repo){
                            return  <li className="running" value={val.name} key={i}><img width="16px" src="/images/correct.png"/> {val.name}</li>;
                        }else{
                            return  <li value={val.name} key={i}>{val.name}</li>;
                        }
                    }
                })}
                <br/>
                <small>For privacy, only public repos are shown. Private repos are still available.</small>
                <br/>
                <a className="gray-button" onClick={disable}>Close</a>
                
                </ul>
                }
            
            </div>
            </a>
            <div>
            <br/>
            <input onChange={setSourceFolder} placeholder="Source folder"></input>
            <small style={{color: 'gray'}}>Leave blank if in root directory. </small>
            <br/>
            </div>
            <p>Run command</p>
            <input onChange={setRunCommand} placeholder="node app.js"></input>
            <a href="../help"><small style={{color: 'gray'}}>Typically node [start_script]</small></a>
            <p>Port</p>
            <input onChange={ setPortNum} type="number" placeholder="3030"></input>
            <small style={{color: 'gray'}}>The port your app is running on.</small>

            <br/>
            <br/>
            <br/>
            <br/>

            <p>{status}</p>
            <a onClick={ ()=>{ deploy() }}className="github-deploy">🚀 Deploy App</a>



        </div>
    )
}