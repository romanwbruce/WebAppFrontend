import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
const axios = require('axios');
import Cookies from "js-cookie";

export default function ({auth}){
    const [log, setLog] = useState([]);
    const [cmd, setCMD] = useState('');
    const [user, setUser] = useState('');
    const router = useRouter()
    const { name } = router.query;

    function changeCMD(e){
      setCMD(e.target.value);
    }

    useEffect( ()=>{
      setUser(Cookies.get('signer'));
    },[]);

    ///api/apps/functions/run
    function run_command(){
      axios.post("api.freeapphosting.net/api/apps/functions/run?appID="+name+"&owner="+Cookies.get('signer')+"&command="+cmd, auth).then(response2 =>{
        const __split = response2.data.command_result.split(/\r?\n/);  


        //var prev = log;
        setLog(__split);

        console.log(response2.data);
      });
    }

    return (
      <div className="console">
         {
                log.map( (i, v)=>(
                    <div>
                    <a key={i}>
                      ~{user}: {i}
                    </a>
                  </div>
                ))
            }
            <div className="commandline">
              <input onChange={changeCMD} type="text" placeholder="Execute command" className="commandInput"></input>      
              <a onClick={run_command} className="sendCommand">SEND</a>        
            </div>
            <br/>
            <a className="">Console is currently in early Beta. Editing of files is not supported yet!</a>
      </div>  
    );
}