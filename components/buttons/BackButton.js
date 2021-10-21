import React, {useState} from 'react'


//-------Styles--------
import styles from "./Buttons.module.css"

import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { motion,AnimatePresence} from "framer-motion"

const BackButton = (props) => {

    const [state,setState] = useState(false);

    return (
        <motion.div onClick={props.onClick} whileTap={()=>setState(true)} animate={state?{background:"#434343", color:"white"}:{}} transition={{duration:1}} className={styles.backButton}>
            <motion.span initial={false} animate={{x:state ? 23 : 0}} transition={{duration:1}}>BACK</motion.span>
            <motion.span className={styles.backButtonIcon} initial={false} animate={{x:state? -50 : 0}} transition={{duration:1}}><FontAwesomeIcon icon={faArrowAltCircleLeft} color={state ? "white" : "#434343"} size="lg" /></motion.span>
        </motion.div>
    )
}

export default BackButton
