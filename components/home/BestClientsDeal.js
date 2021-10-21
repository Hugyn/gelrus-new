import React from 'react'

//-------Modules--------
import BookNowButton from '../buttons/BookNowButton'
import styles from './Home.module.css'

//-------Style--------

function BestClientsDeal() {
    return (
        <div className={styles.bestClientsDeal}>
            <h3 className={styles.bestClientsDealTitle}>Best Clients Deal</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the nails. </p>
            <BookNowButton className={styles.bookNow} theme="pink"/>
        </div>
    )
}

export default BestClientsDeal;
