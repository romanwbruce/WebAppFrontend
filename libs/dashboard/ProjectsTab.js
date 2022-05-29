

export default function ({empty, apps}){
    var moment = require('moment'); 

    return (
        <div className="dropdownOption">
                            {
                                empty &&
                                <div>
                                    <div className="barren">
                                        <h2>No apps. Create one!</h2>
                                    </div>
                                </div>
                            }
                            {
                                !empty && apps!=null &&
                                <div>
                                    {apps.data.map( (i, v) =>(
                                        <div key={v} className="project">
                                              <a href={"/app/"+i.appID}>{i.appName}</a>
                                              <a className="date">Deployed { moment.unix( i.lastDeployed/1000).fromNow()}</a>
                                              <div className='repo'>
                                                <img src="/images/file-storage.png"></img>
                                                <span>{i.repo}</span>
                                            </div>
                                          </div>
                                    ))}

                                 
                                  
                                </div>
                            }   


        </div>
    )
}