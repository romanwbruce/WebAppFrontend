
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';
import Upgrade from '../../libs/Upgrade';
import ProjectsTab from '../../libs/dashboard/ProjectsTab';
import NewProjectTab from '../../libs/dashboard/NewProjectTab';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
const axios = require('axios');
import { useEffect, useState } from 'react';

export async function getServerSideProps({ req, res }) {
    var token = req.cookies.clientToken;
    var signedOn = req.cookies.signedOn;

    var isGithubAuthorized = false;
    var github;
    var apps;

    await axios.get("http://localhost:3030/api/github/user?username="+req.cookies.signer).then(response =>{
       isGithubAuthorized = response.data.status;
       github = response.data;
    });


    await axios.get("http://localhost:3030/api/apps/user?user="+req.cookies.signer).then(response2 =>{
        apps = response2.data;
        console.log(apps);
     });



    if (token == null || token == undefined) {
        token = "INVALID";
        signedOn = "INVALID";
    }
    if (!req.cookies.loggedIn) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    let signer = req.cookies.signer;
    //Load user profile and send it along.
    return { props: { token, signedOn, signer, isGithubAuthorized, github, apps } }
}

export default function ({ token, signedOn, signer, isGithubAuthorized, github, apps }){
    const [tab, setTab] = useState(0);
    const [empty, setEmpty] = useState(false);

    var moment = require('moment'); 
    
    useEffect( ()=>{
        if(apps.data.length==0){
            setEmpty(true);
        }
    },[]);

    return (
        <div>
            <DashboardHeader></DashboardHeader>

        <p className="welcome">Welcome back, {signer}</p>
        {
            !isGithubAuthorized &&
            <a href={"localhost:3030/api/github/auth?username="+signer} className="err" style={{textAlign: 'center'}}>Click here to link your GitHub account.</a>
        }
<div className="dashboard">
                <div className="projects">
                    <h2>My Apps</h2>
                    <div className="optionsParent">
                        <div className="options">
                            <a onClick={ ()=> setTab(0) } className={ tab == 0 ? 'active' : ''}>Apps</a>
                            <a onClick={ ()=> setTab(1) } className={ tab == 1 ? 'active' : ''}>New App</a>
                            {
                                 !isGithubAuthorized &&
                                 <a href="">Link GitHub Account</a>

                            }
                        </div>
                    </div>

                    { tab == 0 &&  <ProjectsTab empty={empty} apps={apps}/> }

                    {
                        isGithubAuthorized && 
                         tab == 1 &&  <NewProjectTab client={signer} gh={github} /> 
                    }
                    {   !isGithubAuthorized && tab ==1 &&
                        <div>
                            <br/>
                            <a href={"localhost:3030/api/github/auth?username="+signer} class="err">Use must link github before deploying an app.</a>
                        </div>
                    }

                </div>  
                <Upgrade/>
                </div>
                <small className="lastLogin">Last login: { moment.unix(signedOn/1000).fromNow() }</small>
            <DashboardFooter></DashboardFooter>
        </div>
    )
}