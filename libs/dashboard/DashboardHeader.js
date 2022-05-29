import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

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
           <a href="../" className="logo">freeapphosting.net</a>
           <a href="../../help">Help</a>
           <a href="https://freeapphosting1.statuspage.io/">Status</a>
           <a onClick={logout()} className="dashboardBtn">Logout</a>
        </div>

    )
}