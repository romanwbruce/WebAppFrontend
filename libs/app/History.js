import { useEffect, useState } from "react"
const axios = require('axios');
import { useRouter } from 'next/router'


export default function (){
    const [history, setHistory] = useState([]);
    const router = useRouter()
    const { name } = router.query;
    var moment = require('moment');

    useEffect( ()=>{
        console.log('appid: '+name);
        axios.get("http://localhost:3030/api/apps/history?appID="+name).then(response2 =>{
           setHistory(response2.data.data.reverse());
           console.log(response2.data);
         });
    }, []);

    return (
        <div className="dropdownOption">

            {
                history.map( (i, v)=>(
                    <div>
                    { (v < 10) &&
                    <a key={v} className={ !i.error ? 'static' : 'err'}>
                        <p style={{fontWeight: 'bold'}}>{i.title}</p>
                        <p style={{fontSize: '12px'}}>{i.body}</p>
                        <small style={{fontSize: '10px'}}>{ moment.unix( i.date/1000).fromNow()}</small>
                    </a>
                    }
                    </div>
                ))
            }

        </div>
    )
}