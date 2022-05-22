import { useRouter, useHistory } from 'next/router'
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';
import Upgrade from '../../libs/Upgrade';
import Manage from '../../libs/app/Manage';
import History from '../../libs/app/History';
import Settings from '../../libs/app/Settings';
import Console from '../../libs/app/Console';

import { useEffect, useState } from 'react';

export default function () {
  const router = useRouter()

  const [tab, setTab] = useState(0);
  const [name, setName] = useState('');

  useEffect( ()=>{
    setName(router.query.name);
  }, [router.query]);

  function refresh(){
    console.log('Refreshing... '+name)
    
  }
  
  return (
    <div>
        <DashboardHeader/> 
        
<div className="dashboard">
                <div className="projects">
                <a href="../dashboard/home" className="return">Dashboard</a>
                    <h2>{ name } <a onClick={refresh}className='twirl'>
                      <img width='16px' src='/images/refresh.png'></img>
                      </a></h2>
                    <div className="optionsParent">
                        <div className="options">
                            <a onClick={ ()=> setTab(0) } className={ tab == 0 ? 'active' : ''}>Manage</a>
                            <a onClick={ ()=> setTab(1) } className={ tab == 1 && name!=undefined ? 'active' : ''}>Notifications</a>
                            <a onClick={ ()=> setTab(3) } className={ tab == 3 && name!=undefined ? 'active' : ''}>Console</a>
                            <a onClick={ ()=> setTab(2) } className={ tab == 2 ? 'active' : ''}>Settings</a>
                        </div>
                    </div>

                    { tab == 0 && name!=undefined &&  <Manage appID={name} /> }
                    { tab == 1 &&  <History/> }
                    { tab == 3 &&  <Console/> }
                    { tab == 2 &&  <Settings/> }

                </div>  
                <Upgrade/>
                </div>

        <DashboardFooter/>
    </div>
  )
}