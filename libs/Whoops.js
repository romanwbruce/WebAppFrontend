

export default function({ known_error }){
    console.log('A generic error was thrown. This is usually an outage with the backend API. Check back shortly.')
    return (
       <div>
           <div className="whoopsies">
               <img src="../images/error.png"></img>
               <div>
                    <a>Error</a>
                    <p>Check back shortly.</p>
                    {
                        known_error &&
                        <pre>{known_error}</pre>
                    }
               </div>
           </div>
       </div>
    )
}