import Head from 'next/head';

export default function Navbar(){
    return (
        <div className="navbar">
            <Head>
                <title>Free App Hosting</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="icon" type="image/x-icon" href="/images/project.png"/>
            </Head>
            <a href="../../" className="logo">freeapphosting.net</a>
            <a href="../login" className="dashboardBtn">Dashboard</a>
        </div>
    )
}