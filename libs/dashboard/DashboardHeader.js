import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Head from 'next/head';
export default function (){
    const router = useRouter();
    const logout = () =>{
        return function () {
            Cookies.remove('clientToken');
            Cookies.remove('loggedIn');
            Cookies.remove('signer');
            Cookies.remove('signedOn');
            router.push('/login');
        }
    }
    return (
        <div className="dashboardHeader">
            <Head>
                <title>Free App Hosting - Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/x-icon" href="/images/project.png"/>
            </Head>
           <a href="../" className="logo">freeapphosting.net</a>
           <a href="../../help">Help</a>
           <a href="https://freeapphosting1.statuspage.io/">Status</a>
           <a onClick={logout()} className="dashboardBtn">Logout</a>
        </div>

    )
}