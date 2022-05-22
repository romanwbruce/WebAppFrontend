
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';
import Upgrade from '../../libs/Upgrade';
import ProjectsTab from '../../libs/dashboard/ProjectsTab';
import NewProjectTab from '../../libs/dashboard/NewProjectTab';
import Whoops from '../../libs/Whoops';

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
const axios = require('axios');
import { useEffect, useState } from 'react';

export async function getServerSideProps({ req, res }) {
    var token = req.cookies.clientToken;
    var signedOn = req.cookies.signedOn;

    var isGithubAuthorized = false;
    var github = null;
    var apps = null;
    var error = true;
    var error_code = "Could not connect to backend server API.";

    await axios.get("http://localhost:3030/api/github/user?username="+req.cookies.signer).then(response =>{
       isGithubAuthorized = response.data.status;
       github = response.data;
       error = false;
        
    }).catch(function (error) {
        error  = true;
    });


    await axios.get("http://localhost:3030/api/apps/user?user="+req.cookies.signer).then(response2 =>{
    
        apps = response2.data;
        console.log(apps);

        error = false;
     }).catch(function (error) {
        error  = true;
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

    console.log(error);
    if(error){
        return { props: {error, error_code} };
    }
    //Load user profile and send it along.
    return { props: { token, signedOn, signer, isGithubAuthorized, github, apps, error, error_code } }
}

export default function ({ token, signedOn, signer, isGithubAuthorized, github, apps, error, error_code }){
    const [tab, setTab] = useState(0);
    const [empty, setEmpty] = useState(false);

    var moment = require('moment'); 
    
    useEffect( ()=>{
        if(!error){
            if(apps.data.length==0){
                setEmpty(true);
            }
        }
    },[]);

    if(error){
        return (
            <div>
                <DashboardHeader></DashboardHeader>
                <Whoops known_error={error_code}></Whoops>
                <DashboardFooter></DashboardFooter>
            </div>
        )
    }else{

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

                    { tab == 0 && !error &&  <ProjectsTab empty={empty} apps={apps}/> }

                    {
                        isGithubAuthorized && !error && 
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
}