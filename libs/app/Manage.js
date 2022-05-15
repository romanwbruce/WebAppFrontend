
export default function (){
    return (
        <div className="dropdownOption">
            <div className="manage">
                <a>Deploy</a>
                <a>Restart</a>
                <a>Stop</a>
            </div>
            <h3>App Health</h3>
            <a className="running"><img width="16px" src="/images/correct.png"/> App is running</a>          

            <h3>Deployment Info</h3>
            <a className="running"><img width="16px" src="/images/correct.png"/> Online since 10 minutes ago</a>
            <br/>            
            <a className="online"><img width="16px" src="/images/world-wide-web.png"/> Live URL: demo1.freeapphosting.co</a>            

        </div>
    )
}