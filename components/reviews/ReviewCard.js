import React from 'react'

//-------Styles--------
import styles from './Reviews.module.css'

//-------Compoents--------
import Star from './Star';

function ReviewCard(props) {
    var stars = [];
    for (var i = 0; i < props.starsRating; i++) {
        stars.push(i);
    } 
    return (
        <div className={styles.reviewCard}>
            <img width='150px' src='/nails.png'/>
            <div className={styles.reviewStars}>
              {stars.map((star)=> 
                <img className={styles.star} id={star} key={star} src='/star.png'></img>
              )}
            </div>
            <h4 className={styles.reviewUserName}>{props.userName}</h4>
            <p className={styles.reviewText}>{props.reviewText}</p>
        </div>
    )
}

export default ReviewCard;
