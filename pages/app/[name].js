import { useRouter, useHistory } from 'next/router'
import DashboardHeader from "../../libs/dashboard/DashboardHeader";
import DashboardFooter from '../../libs/dashboard/DashboardFooter';
import Upgrade from '../../libs/Upgrade';
import Manage from '../../libs/app/Manage';
import History from '../../libs/app/History';
import Settings from '../../libs/app/Settings';
import Logs from '../../libs/app/Logs';
import Console from '../../libs/app/Console';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import InvalidCredentials from '../../libs/auth/InvalidCredentials';
export async function getServerSideProps({ req, res }) {
  var headers = {};
  if(req.cookies.signer  != null){
   headers = {
    headers: {
        '-auth-signer': req.cookies.signer,
        '-auth-signer-token': req.cookies.clientToken
    }
  }
  }else{
    headers = { 
      no: true
    }
  }
  return { props: { headers: headers} }
}

export default function App({headers}) {
  const router = useRouter()

  const [tab, setTab] = useState(0);
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');

  const [bounce, setBounce] = useState(false);

  console.log(headers)

  useEffect( ()=>{
    setName(router.query.name);
  }, [router.query]);

  function refresh(){
    console.log('Refreshing... '+name)
    window.location.reload(false);
  }

  useEffect( ()=>{
    if(Cookies.get('clientToken') == null){
     setBounce(true);
    }
  }, []);
  
  return (
    <div>
      { bounce &&
      <InvalidCredentials></InvalidCredentials>
      }
      
      {  !bounce &&
        <div>
        <DashboardHeader/> 
      <div className="dashboard">
                      <div className="projects">
                      <a href="../dashboard/home" className="return">Dashboard</a>

                          <h2>{realName} <a onClick={refresh}className='twirl'>
                            <img width='16px' src='/images/refresh.png'></img>
                            </a></h2>

                          <div className="optionsParent">
                              <div className="options">
                                  <a onClick={ ()=> setTab(0) } className={ tab == 0 ? 'active' : ''}>Manage</a>
                                  <a onClick={ ()=> setTab(3) } className={ tab == 3 && name!=undefined ? 'active' : ''}>Logs</a>
                                  <a onClick={ ()=> setTab(4) } className={ tab == 4 && name!=undefined ? 'active' : ''}>Console</a>
                                  <a onClick={ ()=> setTab(1) } className={ tab == 1 && name!=undefined ? 'active' : ''}>Alerts</a>
                                  <a onClick={ ()=> setTab(2) } className={ tab == 2 ? 'active' : ''}>Settings</a>
                              </div>
                          </div>

                          { tab == 0 && name!=undefined &&  <Manage setRealName={setRealName} auth={headers} appID={name} /> }
                          { tab == 1 &&  <History auth={headers} /> }
                          { tab == 3 &&  <Logs auth={headers}/> }
                          { tab == 4 &&  <Console auth={headers}/> }
                          { tab == 2 &&  <Settings auth={headers}/> }

                      </div>  
                      <Upgrade/>
                      </div>
              <DashboardFooter/>
              </div>
}

    </div>

      
  )
}