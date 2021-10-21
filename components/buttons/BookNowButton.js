import React from 'react'
import { motion } from "framer-motion"
//-------Styles--------
import styles from "./Buttons.module.css"

function BookNowButton({theme, onClick}) {
    return (
        <motion.div
        className={styles.button}
        whileTap={{scale:0.95, boxShadow:0}}
        onClick={onClick}
        >Book now</motion.div>
    )
}

export default BookNowButton;
