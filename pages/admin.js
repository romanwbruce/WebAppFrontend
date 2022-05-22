import Navbar from '../libs/Navbar';
import Footer from '../libs/Footer';

import Cookies from 'js-cookie'
import Whoops from '../libs/Whoops';
import { useRouter } from 'next/router'
const axios = require('axios');
import { useEffect, useState } from 'react';

export async function getServerSideProps({ req, res }) {
    var token = req.cookies.clientToken;
    var signedOn = req.cookies.signedOn;
    let signer = req.cookies.signer;

    var error = false;
    var error_code = "Could not connect to backend server API.";

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

    console.log(error);
    if(error){
        return { props: {error, error_code} };
    }
    //Load user profile and send it along.
    return { props: { token, signedOn, signer } }
}


export default function ({ token, signedOn, signer }){
    var moment = require('moment');

    return (
        <div>
            <Navbar></Navbar>
                <p className="welcome">Logged in as {signer}</p>
                <div className='adminWrapper'>
                    <div className='admin adminDashboard'>
                        <h1>Admin Dashboard</h1>
                        <a className='gray-button'>Audit Logs</a>
                        <a className='gray-button'>Users</a>
                        <a className='gray-button'>Web Apps</a>
                        <a className='gray-button'>Server Status</a>
                    </div>
                    <div className='admin adminNotifications'>
                        <h1>Notifications</h1>
                        
                    </div>
                </div>
            <Footer></Footer>
        </div>
    )
}