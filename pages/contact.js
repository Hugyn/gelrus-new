import React from 'react'
import { useRouter } from 'next/router';
import DrawerComponent from '../components/DrawerComponent';

function gelrusWork() {
    const router = useRouter()
    console.log(router.query)
    return (
        <DrawerComponent animate={{height:'100%'}} title="Contact Us" >
            <h3>Gelrus Working</h3>
        </DrawerComponent>
    )
}

export default gelrusWork;
