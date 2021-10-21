import React from 'react'

//-------Styles--------
import styles from './Burger.module.css'

//-------Framer Motion--------
import { motion } from "framer-motion"


//------------------------------------------

const customStyles = {
    middle: {width:"80%"},
    bottom: {width:"40%"},
}



function BurgerMenu(props) {
    return (
        <motion.div className={styles.burgerContainer}
        whileTap={({ scale: 0.8 })} 
        onTouchEnd={props.action}
        >
            <span className={props.theme == "dark" ? styles.lineDark : styles.lineLight}></span>
            <span className={props.theme == "dark" ? styles.lineDark : styles.lineLight} style={customStyles.middle}></span>
            <span className={props.theme == "dark" ? styles.lineDark : styles.lineLight} style={customStyles.bottom}></span>
        </motion.div>
    )
}

export default BurgerMenu;
