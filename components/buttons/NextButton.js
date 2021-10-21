import React from 'react'

//-------Styles--------
import styles from "./Buttons.module.css"


import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { motion,AnimatePresence} from "framer-motion"

// props.startAnimate ? {x:-12} : {x:0}
// props.startAnimate ? {x:[0,-12]} : null
// {duration:0.8, repeat:Infinity, ease: "linear"}
const NextButton = (props) => {
    return (
        <div onTouchEnd={props.onTouchEnd} className={styles.buttonNext}>
            NEXT
            <motion.span className={styles.buttonNextIcon} animate={props.animate} initial={props.initial} transition={props.transition}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} style={{fontSize:"34px"}} />
            </motion.span>
        </div>
    )
}

export default NextButton;
