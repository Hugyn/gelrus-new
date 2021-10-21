import React from 'react'
import { useRouter } from 'next/router';
import DrawerComponent from '../../components/DrawerComponent';
import styles from '../../styles/DynamicBooking.module.css'

import BookNowButton from '../../components/buttons/BookNowButton'

function dynamicBooking() {
    const router = useRouter();
    return (
        <DrawerComponent 
        animate={{height:"100%"}}
        transition={{duration:.3}}
        childExit={{x:-1000}}
        childTransition={{duration:.3}}
        exit={{opacity:0}}
        title={router.query.dynamic}
        >
            <h3 style={{margin:0}}>The steps</h3>
            <div className={styles.stepsContainer}>
                <img className={styles.theSteps} src="/mobileSteps.svg" alt="Nails treatment steps"/>
                <BookNowButton onClick={()=> router.push({pathname:"/booking", query:{service:router.query.dynamic}})}/>
            </div>
        </DrawerComponent>
    )
}

export default dynamicBooking;
