
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';
import Upgrade from '../../libs/Upgrade';
import ProjectsTab from '../../libs/dashboard/ProjectsTab';
import NewProjectTab from '../../libs/dashboard/NewProjectTab';
import { useState } from 'react';

export default function (){
    const [tab, setTab] = useState(0);

    

    return (
        <div>
            <DashboardHeader></DashboardHeader>

        <p className="welcome">Welcome back!</p>
<div className="dashboard">
                <div className="projects">
                    <h2>My Apps</h2>
                    <div className="optionsParent">
                        <div className="options">
                            <a onClick={ ()=> setTab(0) } className={ tab == 0 ? 'active' : ''}>Active</a>
                            <a onClick={ ()=> setTab(1) } className={ tab == 1 ? 'active' : ''}>New App</a>
                        </div>
                    </div>

                    { tab == 0 &&  <ProjectsTab/> }
                    { tab == 1 &&  <NewProjectTab/> }

                </div>  
                <Upgrade/>
                </div>
            <DashboardFooter></DashboardFooter>
        </div>
    )
}