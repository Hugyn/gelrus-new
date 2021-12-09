import React from 'react'
import { useRouter } from 'next/router';
import DrawerComponent from '../components/DrawerComponent';

function GelrusServices() {
    const router = useRouter()
    console.log(router.query)
    return (
        <DrawerComponent animate={{height:'82%'}} title="Services & Prices" >
            <h3>Gelrus Working</h3>
        </DrawerComponent>
    )
}

export default GelrusServices;
