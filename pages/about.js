import React from 'react'
import { useRouter } from 'next/router';
import DrawerComponent from '../components/DrawerComponent';

function GelrusWork() {
    const router = useRouter()
    return (
        <DrawerComponent animate={{height:'100%'}} title="About Gelru's" >
            <h3>Gelrus About</h3>
        </DrawerComponent>
    )
}

export default GelrusWork;
