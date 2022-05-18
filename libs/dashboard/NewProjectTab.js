const axios = require('axios');

import { useState, useEffect } from 'react';

/*
  <select style={{marginLeft: '1rem', background: 'white'}}>
                {repos.map( (val, i) => {
                    return <option value={val.name} key={i}>{val.name} @{val.default_branch}</option>;
                })}
            </select>
*/
export default function ({client, gh}){

    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [port, setPort] = useState(0);
    const [source, setSource] = useState('');
    const [repo, setRepo] = useState('');
    const [runCMD, setRunCMD] = useState('');

    const [status, setStatus] = useState('');
    const [owner, setOwner] = useState('');
    const [repos, setRepos] = useState([]);
    const [showRepos, setShowRepos] = useState(false);

    const [av, setAV] = useState('/images/github.png');

    useEffect( ()=>{
        console.log(gh.data.items[0]);
        setOwner(gh.data.items[0].owner.login);
        setRepos(gh.data.items);
        setAV(gh.data.items[0].owner.avatar_url);
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

        await axios.get('http://localhost:3030/api/apps/check/domain?domain='+domain).then(resp => {
            console.log(resp);
            setStatus(resp.data.statusMessage);
            isDomainTaken = resp.data.status; 
        });

        console.log('Is domain taken? '+isDomainTaken)
        if(!isDomainTaken)
            launch();
    }
    
    async function launch(){
        await axios.get('http://localhost:3030/api/apps/create'
            +'?owner='+client+''
            +'&appName='+name+''
            +'&domain='+domain+''
            +'&src='+source+''
            +'&port='+port+''
            +'&repo='+repo+''
            +'&runCommand='+runCMD+''
            ).then(resp => {
            console.log(resp.data);
            setStatus(resp.data.statusMessage);
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
            <a className="running"><img style={{borderRadius: '30px' }}width="32px" src={av} />{owner}       
            <div>
    
          
            <input onClick={show} style={{marginLeft: '1rem'}} onChange={setPullRepo} placeholder='Type repo name here'></input>
                {showRepos &&
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

            <a onClick={ ()=>{ deploy() }}className="github-deploy">🚀 Deploy App</a>



        </div>
    )
}