import React from 'react'
import { useRouter } from 'next/router';
import DrawerComponent from '../components/DrawerComponent';

function GelrusWork() {
    const router = useRouter()
    console.log(router.query)
    return (
        <DrawerComponent animate={{height:'100%'}} title="Gelru's Work" >
            <h3>Gelrus Working</h3>
        </DrawerComponent>
    )
}

export default gelrusWork;
