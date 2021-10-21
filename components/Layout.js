import React from 'react'
import Head from 'next/head'
import Navbar from './navbar';
import Footer from './Footer';

import { useRouter } from 'next/router';

function Layout({children}) {
    const router = useRouter();
    return (
        <div className="layout">
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <Navbar/>

                {children}
                
            {router.pathname == "/" ? <Footer/> : null}  
            
        </div>
    )
}

export default Layout;
