

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
                                        <div className="project">
                                              <a>{i.appName}</a>
                                              <a className="date">Deployed { moment.unix( i.lastDeployed/1000).fromNow()}</a>
                                              <a className="gray-button" href={"/app/"+i.appID}>VIEW</a>
                                          </div>
                                    ))}

                                 
                                  
                                </div>
                            }   


        </div>
    )
}