import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

const axios = require('axios');

export default function ({auth}){
    const [log, setLog] = useState([]);
    const router = useRouter()
    const { name } = router.query;

    useEffect( ()=>{
        axios.get("http://localhost:3030/api/apps/logs?appID="+name, auth).then(response2 =>{
            console.log(response2.data.data.log);
           setLog(response2.data.data.log);
         })
    },  []);

    return (
      <div className="console">
         {
                log.map( (i, v)=>(
                    <div>
                    { (v < 30) &&
                    <a key={i}>
                      {i}
                    </a>
                    }
                  </div>
                ))
            }
      </div>  
    );
}