import React from 'react'
import { useRouter } from 'next/router';
import DrawerComponent from '../components/DrawerComponent';

function GelrusAbout() {
    const router = useRouter()
    return (
        <h3>Gelrus About</h3>
        // <DrawerComponent animate={{height:'100%'}} title="About Gelru's" >
          
        // </DrawerComponent>
    )
}

export default GelrusAbout;
