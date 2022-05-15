

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
            <select>
                <option>mywebapp - master @main</option>
            </select>
            <input placeholder="Source folder"></input>
            <br/>
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