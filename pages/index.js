import React, { useEffect } from 'react';

//-------Styles--------
import styles from  '../styles/Home.module.css'

import { Container } from '@material-ui/core';
import { motion } from "framer-motion"

//-------Components--------
import Reviews from '../components/reviews';
import CirclesDesktop from '../components/circlesGuide/CirclesDesktop';
import BestClientsDeal from '../components/home/BestClientsDeal';
import Card from '../components/home/Card';

const cards = [
    {title: "Manicure", id:1, image: "manicure.png" },
    {title: "Pedicure", id:2, image: "pedicure.png" },
    {title: "Treatment", id:3, image: "treatment.png" },
    {title: "Podiatry", id:4, image: "podiatry.png" },
]


function Home(props) {
    return (
        <>
            <motion.div
                exit={{opacity:0}}
                className={styles.desktop}
                initial={{opacity:0 }}
                animate={{opacity:1}}
                transition={{duration:1}}>
                <Container>
                    <h1 className={styles.reviewsTittle}>REVIEWS</h1>
                    <Reviews/>
                    <CirclesDesktop/>
                </Container>

                <BestClientsDeal/>
            </motion.div>

            <motion.div 
                className={styles.mobile}
                exit={{opacity:0}}
                initial={{opacity:0 , y:100}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.5}}
            >
                <div className={styles.mobileCardsContainer}>
                 <img src="/Logo.svg" alt="Gelru's Logo" width="100px"/> 
                    {cards.map((item)=> 
                        <Card key={item.id} id={item.id} title={item.title} image={item.image}/>
                    )}
                </div>
            </motion.div>
        </>
    )
}

export default Home;