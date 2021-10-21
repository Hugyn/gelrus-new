import React from 'react';
import { useRouter } from 'next/router'

//-------Style--------
import styles from './Home.module.css'



function Card(props) {
    const router = useRouter()
    return (
        <div onClick={()=> router.push(`/booking/${props.title}`)} className={styles.card}>
            <div className={styles.cardImage} style={{backgroundImage:`url(/${props.image})`}}></div>
            <div>
                <h3 className={styles.cardTittle}>{props.title}</h3>
                <p className={styles.seeMore}>See more</p>
            </div>
        </div>
    )
}

export default Card;
