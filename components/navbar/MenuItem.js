import {useRouter} from 'next/router';
import React from 'react'

//-------Framer Motion--------
import { motion } from "framer-motion"

const MenuItem = ({children, link, className}) => {
  const router = useRouter()
    return (
          <motion.a
          className={className}
          onClick={()=> router.replace(link)}
          whileTap={{scale:0.95}}
          >
            {children}
          </motion.a>
    )
}

export default MenuItem;
