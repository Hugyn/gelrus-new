import React from 'react'

//-------Styles--------
import styles from "./Buttons.module.css"


import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { motion } from "framer-motion"

const NextButton = (props) => {
    return (
        <div onClick={props.onClick} className={styles.buttonNext}>
            {props.text ? props.text : "NEXT"}
            <motion.span className={styles.buttonNextIcon} animate={props.animate} initial={props.initial} transition={props.transition}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} style={{fontSize:"28px"}} />
            </motion.span>
        </div>
    )
}

export default NextButton;
