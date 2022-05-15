import { useRouter } from 'next/router'
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';
import Upgrade from '../../libs/Upgrade';
import Manage from '../../libs/app/Manage';
import History from '../../libs/app/History';
import Settings from '../../libs/app/Settings';

import { useState } from 'react';

export default function () {
  const router = useRouter()
  const { name } = router.query;
  const [tab, setTab] = useState(0);

  
  return (
    <div>
        <DashboardHeader/> 
        
<div className="dashboard">
                <div className="projects">
                <a href="../dashboard/home" className="return">Dashboard</a>
                    <h2>{ name } </h2>
                    <div className="optionsParent">
                        <div className="options">
                            <a onClick={ ()=> setTab(0) } className={ tab == 0 ? 'active' : ''}>Manage</a>
                            <a onClick={ ()=> setTab(1) } className={ tab == 1 ? 'active' : ''}>History</a>
                            <a onClick={ ()=> setTab(2) } className={ tab == 2 ? 'active' : ''}>Settings</a>
                        </div>
                    </div>

                    { tab == 0 &&  <Manage/> }
                    { tab == 1 &&  <History/> }
                    { tab == 2 &&  <Settings/> }

                </div>  
                <Upgrade/>
                </div>

        <DashboardFooter/>
    </div>
  )
}