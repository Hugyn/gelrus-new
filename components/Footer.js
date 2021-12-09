import React from 'react'
import { motion } from "framer-motion"

//-------Components--------

//-------Styles--------
import styles from "./Footer.module.css"
function Footer() {
    return (
        <motion.div 
        className={styles.footerContainer}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.8}}
        >
            <div className={styles.topFooter}>
                <ul>
                    <li className={styles.listItem}>Home</li>
                    <li className={styles.listItem}>Book session</li>
                    <li className={styles.listItem}>Cancel session</li>
                </ul>
                <ul>
                    <li className={styles.listItem}>Contact Gelru&apos;s</li>
                    <li className={styles.listItem}>Get help</li>
                    <li className={styles.listItem}>Privacy &amp; Policy</li>
                </ul>
            </div>
            <div className={styles.bottomFooter}>
                <img className={styles.logoFooter} src="/Logo.svg" alt="Gelru's Logo" width="120px" />
                <p>©  2021 gerul&apos;s | All rights Reserved</p>
            </div>
        </motion.div>
    )
}

export default Footer;
