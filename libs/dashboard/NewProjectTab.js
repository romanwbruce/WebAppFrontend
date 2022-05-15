

export default function (){
    return (
        <div className="dropdownOption">
            
            <p>Project name</p>
            <input placeholder="Project-name" type="text" />
            <br/>
            <p>Choose domain</p>
            <input placeholder="Project-name" type="text" />
            <select>
                <option>.freeapphosting.co</option>
            </select>
            <p>Choose repo</p>
            <a className="running"><img width="16px" src="/images/github.png"/> GitHub account: asdasd</a>          
            <br/>
            <select>
                <option>mywebapp - master @main</option>
            </select>
            <div>
            <br/>
            <input placeholder="Source folder"></input>
            <br/>
            </div>
            <p>Run command</p>
            <input placeholder="node app.js"></input>
            
            <br/>
            <br/>
            <br/>
            <br/>

            <a className="github-deploy">🚀 Deploy App</a>



        </div>
    )
}