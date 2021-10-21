import React from 'react'

//-------Styles--------
import styles from './Reviews.module.css'

//-------Components--------
import ReviewCard from './ReviewCard';


function Reviews() {
    return (
        <div className={styles.reviewsContainer}>
            <ReviewCard starsRating="3" userName="Marcia" reviewText="musfsfffsdfsdfhn"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
            <ReviewCard starsRating="5" userName="seila"/>
        </div>
    )
}

export default Reviews;
